import express, { Router } from 'express';
import statusController from '../controllers/status.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const statusRouter: Router = express.Router();

statusRouter.get('/', statusController.findAll);
statusRouter.post('/', authUser, authAdmin, statusController.create);
statusRouter.get('/:id', statusController.findOne);
statusRouter.put('/:id', authUser, authAdmin, statusController.update);
statusRouter.delete('/:id', authUser, authAdmin, statusController.delete);

export default statusRouter;