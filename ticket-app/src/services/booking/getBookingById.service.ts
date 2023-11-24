import db from "@/database/drizzle";
import { bookings, seats } from "@/models";
import { eq } from "drizzle-orm";

export interface GetSeatByIdRequest {
    id: string;
}

const getBookingByIdService = async (req: GetSeatByIdRequest) => {
    console.log(`getBookingByIdService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.select({
        id: bookings.id,
        seat_id: bookings.seat_id,
        user_id: bookings.user_id,
        status: bookings.status,
        seat_number: seats.number,
        event_id: seats.event_id,
        seat_status: seats.status,
        created_at: bookings.created_at,
        updated_at: bookings.updated_at,
    }).from(bookings).where(eq(bookings.id, id))
    .innerJoin(seats, eq(bookings.seat_id, seats.id))
            
    return res[0];
}

export default getBookingByIdService;