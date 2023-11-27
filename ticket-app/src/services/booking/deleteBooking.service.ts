import { bookings } from "@/models";
import { eq } from "drizzle-orm";
import { updateSeatStatusService } from "../seat";
import { DrizzlePool } from "@/common/types";

export interface DeleteBookingRequest {
    id: string;
}

const deleteBookingService = async (db: DrizzlePool, req: DeleteBookingRequest) => {
    console.log(`deleteBookingService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.transaction(async (trx) => {
        const res = await trx.delete(bookings).where(eq(bookings.id, id))
                        .returning({
                            id: bookings.id,
                            seat_id: bookings.seat_id,
                            user_id: bookings.user_id,
                            status: bookings.status,
                            created_at: bookings.created_at,
                            updated_at: bookings.updated_at,
                        })

        const booking = res[0];

        // update seat status to open if booking is confirmed or pending
        if (booking.status === 'confirmed' || booking.status === 'pending') {
            await updateSeatStatusService(trx, {id: booking.seat_id, status: 'open'})
        }

        return booking
    })
            
    return res;
}

export default deleteBookingService;