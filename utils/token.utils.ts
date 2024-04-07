import { Response } from 'express';
import { UserType } from '../types/user.type';
import { createAccessToken, createRefreshToken } from './jwt.utils';

export const generateTokens = (user: UserType) => {
  const tokenData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    pictureProfile: user.pictureProfile,
    age: user.age,
    role: user.role,
    point: user.point,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const accessToken = createAccessToken(tokenData);
  const refreshToken = createRefreshToken(tokenData);

  return { accessToken, refreshToken };
};

export const setRefreshTokenCookie = (
  response: Response,
  refreshToken: string
) => {
  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/user/refresh_token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
