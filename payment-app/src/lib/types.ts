import { z } from 'zod';

export const UUID = z.object({
  bookingId: z.string().uuid(),
});

export const Status = z.object({
  status: z.boolean(),
});
