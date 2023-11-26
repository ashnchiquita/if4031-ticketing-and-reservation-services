import db from "@/database/drizzle";
import { bookingQueue } from "@/models";
import { eq } from "drizzle-orm";

export interface DeleteBookingQueueRequest {
    id: string;
}

const deleteBookingQueueService = async (req: DeleteBookingQueueRequest) => {
    console.log(`deleteBookingQueueService: ${JSON.stringify(req)}`)

    const { id } = req;

    const res = await db.delete(bookingQueue).where(eq(bookingQueue.id, id))
                .returning({
                    id: bookingQueue.id,
                    seat_id: bookingQueue.seat_id,
                    user_id: bookingQueue.user_id,
                    created_at: bookingQueue.created_at,
                    updated_at: bookingQueue.updated_at,
                })
                            

    return res[0];
}

export default deleteBookingQueueService;