import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import userRouter from './routes/user.route';

dotenv.config();

const app: Application = express();
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
  console.log(`Server is Fire at http://localhost:${port}`);
});

app.use('/api', userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
