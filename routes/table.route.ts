import express, { Router } from 'express';
import tableController from '../controllers/table.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const tableRouter: Router = express.Router();

tableRouter.get('/', tableController.findAll);
tableRouter.get('/booked-table', tableController.checkTableAlreadyBooked);
tableRouter.post('/', authUser, authAdmin, tableController.create);
tableRouter.get('/:id', tableController.findById);
tableRouter.put('/:id', authUser, authAdmin, tableController.update);
tableRouter.delete('/:id', authUser, authAdmin, tableController.delete);

export default tableRouter;
