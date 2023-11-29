import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { auth } from './middleware/auth';
import { create, del, get, update } from './routes/invoice-routes';
import { createInvoice, pay } from './routes/payment-routes';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { webhookQueue } from './utils/queue';

dotenv.config();

const app = express();
const port = Number(process.env.PAYMENT_SERVICE_PORT);
app.use(bodyParser.json());

app.use(
  cors({
    origin: ['*'],
    credentials: true,
    exposedHeaders: ['Authorization', 'x-api-key'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  }),
);

app.use('/api', auth);

app.get('/api/invoices/:booking_id', get);
app.post('/api/invoices', create);
app.put('/api/invoices/:booking_id', update);
app.delete('/api/invoices/:booking_id', del);
app.post('/api/payment', createInvoice);

app.get('/payment', pay);

// QUEUE GUI
// TODO: comment
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(webhookQueue)],
  serverAdapter: serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
