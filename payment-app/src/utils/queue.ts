import Bull, { Job } from 'bull';
import updateWebhook from './webhook';

const webhookQueue = new Bull('webhook', {
  redis: process.env.REDIS_URL as string,
  defaultJobOptions: {
    attempts: 3,
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
  webhookQueue.add({ ...req });
};

const processWebhookQueue = async (job: Job) => {
  const { bookingId, status, message } = job.data;
  const res = await updateWebhook(bookingId, status, message);
};
