import db from "@/database/drizzle";
import { bookings } from "@/models";
import { eq } from "drizzle-orm";

export interface UpdateBookingStatusRequest { 
    id: string;
    status: "pending" | "confirmed" | "cancelled";
}

const updateBookingStatusService = async (req: UpdateBookingStatusRequest) => {
    console.log(`updateBookingstatus: updating seat with id ${req.id} and status ${req.status}.`);

    const {status, id} = req;

    const res = await db.update(bookings).set({
        status: status,
      }).where(eq(bookings.id, id)).returning({
        id: bookings.id,
        seat_id: bookings.seat_id,
        user_id: bookings.user_id,
        status: bookings.status,
        created_at: bookings.created_at,
        updated_at: bookings.updated_at,
      })

    const seat = res[0];
    return seat;
}

export default updateBookingStatusService;