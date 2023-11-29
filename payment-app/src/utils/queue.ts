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
  console.log('Enqueuing:', req);
  webhookQueue.add({ ...req });
};

webhookQueue.process(async (job: Job) => {
  console.log('Processing job with data:', job.data);
  const { bookingId, status, message } = job.data;
  const res = await updateWebhook(bookingId, status, message);

  if (!res.ok) {
    // TODO: only accept res status 5XX
    console.log('Webhook response status: ' + res.status);

    // move to delayed (retry) list
    throw new Error();
  }
});

export default enqueue;
