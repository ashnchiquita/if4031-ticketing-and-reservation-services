import Bull, { Job } from 'bull';
import updateWebhook from './webhook';

export const webhookQueue = new Bull('webhook', {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
  },
  defaultJobOptions: {
    attempts: Number.MAX_SAFE_INTEGER,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

type WebhookReq = {
  bookingId: string;
  status: string;
  message: string;
};

const enqueue = async (req: WebhookReq) => {
  console.log('Queue: Enqueuing:', req);
  webhookQueue.add({ ...req });
};

webhookQueue.process(async (job: Job) => {
  console.log('Queue: Processing job with data:', job.data);
  const { bookingId, status, message } = job.data;
  const res = await updateWebhook(bookingId, status, message);
  console.log('Queue: Webhook response status: ' + res.status);

  if (res.status >= 500) {
    // move to delayed (retry) list
    console.log('Queue: Received internal server error... Moving job to delayed list...');
    throw new Error();
  } else if (!res.ok) {
    console.log('Queue: Invalid request, status code = ' + res.status);
  }
});

export default enqueue;
