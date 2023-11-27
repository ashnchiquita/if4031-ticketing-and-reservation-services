import { DrizzlePool } from "@/common/types";
import { bookingQueue } from "@/models/bookingQueue.model";
import { DrizzleError } from "drizzle-orm";

export interface CreateBookingQueueRequest {
    seatId: string;
    userId: string;
}

const createBookingQueueService = async (db: DrizzlePool, req: CreateBookingQueueRequest) => {
    console.log(`createBookingQueueService: ${JSON.stringify(req)}`)
    
    const { seatId, userId } = req;

    try {
        const res = await db.insert(bookingQueue).values({
            seat_id: seatId,
            user_id: userId,
        }).returning({
            id: bookingQueue.id,
            seat_id: bookingQueue.seat_id,
            user_id: bookingQueue.user_id,
            created_at: bookingQueue.created_at,
            updated_at: bookingQueue.updated_at,
        })
    
        const booking = res[0];
        return booking;
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'duplicate key value violates unique constraint "booking_queue_seat_id_user_id_unique"') {
                throw new DrizzleError({
                    message: `You are already in the queue for seat ${seatId}`
                });
            }
        }
    }
}

export default createBookingQueueService;