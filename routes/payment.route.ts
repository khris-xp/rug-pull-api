import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const paymentRouter = Router();

paymentRouter.get('/', authUser, authAdmin, paymentController.findAll);
paymentRouter.get('/:id', authUser, paymentController.findOne);
paymentRouter.post('/', authUser, paymentController.create);

export default paymentRouter;
