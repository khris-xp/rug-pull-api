import dotenv from 'dotenv';
import express, { Application, Express, Request, Response } from 'express';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World from Rug Pull API' });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
