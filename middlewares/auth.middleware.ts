import { NextFunction, Request, Response } from 'express';
import { UserType } from '../types/user.type';
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
  user?: UserType;
}

const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Invalid Authentication.' });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error: Error, user: UserType) => {
        if (error) {
          return res.status(400).json({ msg: error.message });
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
};

export default authUser;
