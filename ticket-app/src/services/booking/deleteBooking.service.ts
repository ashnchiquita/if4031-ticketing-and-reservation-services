import db from "@/database/drizzle";
import { bookings } from "@/models";
import { eq } from "drizzle-orm";

export interface DeleteBookingRequest {
    id: string;
}

const deleteBookingService = async (req: DeleteBookingRequest) => {
    console.log(`deleteBookingService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.delete(bookings).where(eq(bookings.id, id))
    .returning({
        id: bookings.id,
        seat_id: bookings.seat_id,
        user_id: bookings.user_id,
        status: bookings.status,
        created_at: bookings.created_at,
        updated_at: bookings.updated_at,
    })
            
    return res[0];
}

export default deleteBookingService;