import express, { Router } from 'express';
import topicController from '../controllers/topics.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const topicRouter: Router = express.Router();

topicRouter.get('/', topicController.findAll);
topicRouter.post('/', authUser, authAdmin, topicController.create);
topicRouter.get('/:id', topicController.findById);
topicRouter.put('/:id', authUser, authAdmin, topicController.update);
topicRouter.delete('/:id', authUser, authAdmin, topicController.delete);

export default topicRouter;
