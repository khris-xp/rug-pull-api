import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import authUser from '../middlewares/auth.middleware';

const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authUser, userController.getUserProfile);

export default userRouter;
