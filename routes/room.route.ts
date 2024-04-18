import express, { Express, Router } from 'express';
import roomController from '../controllers/room.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const roomRouter: Router = express.Router();

roomRouter.get('/', roomController.findAll);
roomRouter.post('/', authUser, authAdmin, roomController.create);
roomRouter.get('/:id', roomController.findById);
roomRouter.put('/:id', authUser, authAdmin, roomController.update);
roomRouter.put(
  '/:id/remove-table',
  authUser,
  authAdmin,
  roomController.removeTable
);
roomRouter.delete('/:id', authUser, authAdmin, roomController.delete);

export default roomRouter;
