import express, { Router } from 'express';
import bookingController from '../controllers/booking.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const bookingRouter: Router = express.Router();

bookingRouter.get('/', authUser, authAdmin, bookingController.findAll);
bookingRouter.post('/', authUser, bookingController.create);
bookingRouter.get('/:id', authUser, bookingController.findById);
bookingRouter.put('/:id', authUser, authAdmin, bookingController.update);
bookingRouter.delete('/:id', authUser, authAdmin, bookingController.delete);

export default bookingRouter;
