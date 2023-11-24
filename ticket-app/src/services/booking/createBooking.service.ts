import db from "@/database/drizzle";
import { bookings } from "@/models";
import { DrizzleError } from "drizzle-orm";

export interface createBookingServiceSchema {
    seatId: string;
    userId: string;
}

const createBookingService = async (req: createBookingServiceSchema) => {
    console.log(`createBooking: creating booking with seat id ${req.seatId} and user id ${req.userId}.`);

    const { seatId, userId } = req;

    try {
        const res = await db.insert(bookings).values({
        seat_id: seatId,
        user_id: userId,
        status: "pending",
        }).returning({
            id: bookings.id,
            seat_id: bookings.seat_id,
            user_id: bookings.user_id,
            status: bookings.status,
            created_at: bookings.created_at,
            updated_at: bookings.updated_at,
        })

        const event = res[0];
        return event;
    } catch (err) {
        console.log("createSeat: error inserting seat into database.");
        console.log(err);
        if (err instanceof Error) {
            if (err.message === 'insert or update on table "bookings" violates foreign key constraint "bookings_seat_id_seats_uuid_fk"') {
                throw new DrizzleError({
                    message: `Seat with id ${seatId} does not exist.`,
                });
            }
        }
        throw err;
    }
}

export default createBookingService;