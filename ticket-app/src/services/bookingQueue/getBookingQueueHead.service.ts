import db from "@/database/drizzle";
import { bookingQueue } from "@/models/bookingQueue.model";
import { asc, eq } from "drizzle-orm";

export interface GetBookingQueueHeadRequest {
    seatId: string;
}

const getBookingQueueHeadService = async (req: GetBookingQueueHeadRequest) => {
    console.log(`getBookingQueueHeadService: ${JSON.stringify(req)}`)

    const { seatId } = req;

    const booking = await db.transaction(async (trx) => {
        const res = await trx.select({
            id: bookingQueue.id,
            seat_id: bookingQueue.seat_id,
            user_id: bookingQueue.user_id,
            created_at: bookingQueue.created_at,
            updated_at: bookingQueue.updated_at,
        }).from(bookingQueue)
        .where(eq(bookingQueue.seat_id, seatId))
        .orderBy(asc(bookingQueue.created_at))
        .limit(1)

        const head = res[0]
        if (head) {
            // Remove from queue
            await trx.delete(bookingQueue).where(eq(bookingQueue.id, head.id))
        }

        return head;
    })

    return booking;
}

export default getBookingQueueHeadService;