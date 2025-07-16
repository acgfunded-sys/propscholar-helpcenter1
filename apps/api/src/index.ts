import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
