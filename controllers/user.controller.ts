import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import {  UserType } from '../types/user.type';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import { generateTokens, setRefreshTokenCookie } from '../utils/token.utils';
import { UserDto } from '../dto/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

const userController = {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               pictureProfile:
   *                 type: string
   *               age:
   *                 type: number
   *     responses:
   *       '200':
   *         description: Register successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *       '400':
   *         description: Email already exists
   */
  register: async (request: Request, response: Response) => {
    try {
      const { firstName, lastName, email, password, pictureProfile, age } =
        request.body;

      const user = await User.findOne({ email });
      if (user) {
        return response.status(400).json({ message: 'Email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        pictureProfile,
        age,
      });

      const { accessToken, refreshToken } = generateTokens(newUser);

      setRefreshTokenCookie(response, refreshToken);

      await newUser.save();

      return successResponseStatus(response, 'Register successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Login successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *       '400':
   *         description: User does not exist
   */
  login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: 'User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({ message: 'Incorrect password.' });
      }

      const { accessToken, refreshToken } = generateTokens(user);

      setRefreshTokenCookie(response, refreshToken);

      return successResponseStatus(response, 'Login successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  refreshToken: async (request: Request, response: Response) => {
    try {
      const refreshToken = request.cookies.refreshToken;

      if (!refreshToken) {
        return response.status(400).json({ message: 'Please login now.' });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as UserType;
      if (!decoded)
        return response.status(400).json({ msg: 'Please login now!' });

      const user = await User.findById(decoded._id).select('-password');
      if (!user)
        return response
          .status(400)
          .json({ msg: 'This account does not exist.' });

      const { accessToken } = generateTokens(user);

      return successResponseStatus(response, 'Refresh token successfully.', {
        accessToken,
      });
    } catch (error) {
      handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/auth/profile:
   *   get:
   *     summary: Get user profile
   *     tags: [User]
   *     security:
   *        - Authorization: []
   *
   *     responses:
   *       '200':
   *         description: Get user profile successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     firstName:
   *                       type: string
   *                     lastName:
   *                       type: string
   *                     email:
   *                       type: string
   *                     pictureProfile:
   *                       type: string
   *                     age:
   *                       type: number
   *                     role:
   *                       type: string
   *                     point:
   *                       type: number
   *                     createdAt:
   *                       type: string
   *                     updatedAt:
   *                       type: string
   *       '400':
   *         description: User does not exist
   *       '404':
   *         description: User not found
   */
  getUserProfile: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      if (!userId) {
        return response.status(400).json({ message: 'User does not exist.' });
      }

      const user = await UserRepository.findById(userId.toString());
      return successResponseStatus(
        response,
        'Get user profile successfully.',
        user
      );
    } catch (error) {
      handleError(response, error);
    }
  },
  getUserById: async (request: Request, response: Response) => {
    try {
      const userId = request.params.id;
      if (userId) {
        const user = await UserRepository.findById(userId.toString());
        return successResponseStatus(
          response,
          'Get user by id sucessfully.',
          user
        );
      }
    } catch (error) {
      handleError(response, error);
    }
  },
  updateUserProfile: async (request: Request, response: Response) => {
    try {
      try {
        const userId = request.user?._id;
        if (!userId) {
          return response.status(400).json({ message: 'User does not exist.' });
        }

        const user = await UserRepository.findById(userId.toString());
        if (!user) {
          return response.status(404).json({ message: 'User not found.' });
        }

        const { firstName, lastName, email, age, pictureProfile } =
          request.body;

        const updatedData: UserDto = {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          age: age || user.age,
          pictureProfile: pictureProfile || user.pictureProfile,
        };

        await UserRepository.update({ _id: userId.toString() }, updatedData);

        const updatedUser = await UserRepository.findById(userId.toString());

        return response.status(200).json({
          message: 'Update user profile successfully.',
          user: updatedUser,
        });
      } catch (error) {
        console.error('Error updating user profile:', error);
        return response.status(500).json({ message: 'Internal server error.' });
      }
    } catch (error) {
      handleError(response, error);
    }
  },
  updateUserRole: async (request: Request, response: Response) => {
    try {
      const userId = request.user?._id;
      if (!userId) {
        return response.status(400).json({ message: 'User does not exist.' });
      }
      const user = await UserRepository.findById(userId.toString());

      const { role } = request.body;
      if (user) {
        user.role = role || user.role;
        await user.save();
      }
      return successResponseStatus(
        response,
        'Upadte user role successfully.',
        user
      );
    } catch (error) {
      handleError(response, error);
    }
  },
};

export default userController;
