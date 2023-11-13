import express, { Request, Response } from 'express';
import { PaymentController } from './controllers/payment.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PAYMENT_SERVICE_PORT as string;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

const pc = new PaymentController();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
