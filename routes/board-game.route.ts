import express, { Router } from 'express';
import boardGameController from '../controllers/board-game.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const boardGameRouter: Router = express.Router();

boardGameRouter.get('/', boardGameController.findAll);
boardGameRouter.post('/', authUser, authAdmin, boardGameController.create);
boardGameRouter.get('/:id', boardGameController.findById);
boardGameRouter.put('/:id', authUser, authAdmin, boardGameController.update);
boardGameRouter.delete('/:id', authUser, authAdmin, boardGameController.delete);

export default boardGameRouter;
