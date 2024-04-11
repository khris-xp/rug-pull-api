import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import boardGameRouter from './routes/board-game.route';
import categoryRouter from './routes/category.route';
import roomRouter from './routes/room.route';
import statusRouter from './routes/status.route';
import tableRouter from './routes/table.route';
import topicRouter from './routes/topic.route';
import uploadRouter from './routes/upload.route';
import userRouter from './routes/user.route';
import { swaggerSetup } from './swagger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World from Rug Pull API' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

swaggerSetup(app);

app.use('/api/auth', userRouter);
app.use('/api/topics', topicRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/statuses', statusRouter);
app.use('/api/tables', tableRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/board-games', boardGameRouter);
app.use('/api/uploads', uploadRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
