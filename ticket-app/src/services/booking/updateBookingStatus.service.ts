import db from "@/database/drizzle";
import { bookingQueue, bookings, seats } from "@/models";
import { eq } from "drizzle-orm";
import { getBookingQueueHeadService } from "../bookingQueue";

export interface UpdateBookingStatusRequest { 
    id: string;
    status: "pending" | "confirmed" | "cancelled";
}

const updateBookingStatusService = async (req: UpdateBookingStatusRequest) => {
    console.log(`updateBookingstatus: ${JSON.stringify(req)}`);

    const {status, id} = req;

    const seat = await db.transaction(async (trx) => {
      const res =  await trx.update(bookings).set({
          status: status,
        }).where(eq(bookings.id, id)).returning({
          id: bookings.id,
          seat_id: bookings.seat_id,
          user_id: bookings.user_id,
          status: bookings.status,
          created_at: bookings.created_at,
          updated_at: bookings.updated_at,
        })

      const booking = res[0];
      
      if (status === "confirmed") {
        // Update seat status to booked
        await db.update(seats).set({
          status: "booked",
        }).where(eq(seats.id, booking.seat_id))
        
        // Remove from queue
        await db.delete(bookingQueue)
          .where(eq(bookingQueue.seat_id, booking.seat_id))
      } else if (status === "cancelled") {
        //TODO! Process Queue
        const nextBooking = await getBookingQueueHeadService({ seatId: booking.seat_id });
        if (nextBooking) {
          await db.insert(bookings).values({
            seat_id: nextBooking.seat_id,
            user_id: nextBooking.user_id,
            status: "pending",
          })
        } else {
          await db.update(seats).set({
            status: "open",
          }).where(eq(seats.id, booking.seat_id))
        }
      }

      return booking;
    })

    return seat;
}

export default updateBookingStatusService;