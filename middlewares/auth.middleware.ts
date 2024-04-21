import { NextFunction, Request, Response } from 'express';
import { UserType } from '../types/user.type';
import { errorResponseStatus } from '../utils/response.utils';
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
  user?: UserType;
}

const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponseStatus(res, 'Invalid Authentication.', null, 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token)
      return errorResponseStatus(res, 'Invalid Authentication.', null, 401);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (error: Error, user: UserType) => {
        if (error) {
          return errorResponseStatus(res, error.message, null, 401);
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
