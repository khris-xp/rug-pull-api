import express, { Express, Router } from 'express';
import categoryController from '../controllers/category.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const categoryRouter: Router = express.Router();

categoryRouter.get('/', categoryController.findAll);
categoryRouter.post('/', authUser, authAdmin, categoryController.create);
categoryRouter.get('/:id', categoryController.findById);
categoryRouter.put('/:id', authUser, authAdmin, categoryController.update);
categoryRouter.delete('/:id', authUser, authAdmin, categoryController.delete);

export default categoryRouter;
