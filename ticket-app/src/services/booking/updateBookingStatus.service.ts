import { bookingQueue, bookings, seats } from "@/models";
import { and, eq, inArray } from "drizzle-orm";
import { getBookingQueueHeadService } from "../bookingQueue";
import { BookingStatus, DrizzlePool } from "@/common/types";

export interface UpdateBookingStatusRequest { 
    id: string;
    status: BookingStatus;
}

const updateBookingStatusService = async (db: DrizzlePool,  req: UpdateBookingStatusRequest, allowedStatus: BookingStatus[] = ["pending", "confirmed", "cancelled"]) => {
    console.log(`updateBookingstatus: ${JSON.stringify(req)}`);

    const {status, id} = req;

    const seat = await db.transaction(async (trx) => {
      const res =  await trx.update(bookings).set({
          status: status,
        }).where(and(eq(bookings.id, id), inArray(bookings.status, allowedStatus))).returning({
          id: bookings.id,
          seat_id: bookings.seat_id,
          user_id: bookings.user_id,
          status: bookings.status,
          created_at: bookings.created_at,
          updated_at: bookings.updated_at,
        })

      if (res.length === 0) {
        return null;
      }

      const booking = res[0];
      
      if (status === "confirmed") {
        // Update seat status to booked
        await trx.update(seats).set({
          status: "booked",
        }).where(eq(seats.id, booking.seat_id))
        
        // Remove from queue
        await trx.delete(bookingQueue)
          .where(eq(bookingQueue.seat_id, booking.seat_id))
      } else if (status === "cancelled") {
        //TODO! Process Queue
        const nextBooking = await getBookingQueueHeadService(trx, { seatId: booking.seat_id });
        if (nextBooking) {
          await trx.insert(bookings).values({
            seat_id: nextBooking.seat_id,
            user_id: nextBooking.user_id,
            status: "pending",
          })
        } else {
          await trx.update(seats).set({
            status: "open",
          }).where(eq(seats.id, booking.seat_id))
        }
      }

      return booking;
    })

    return seat;
}

export default updateBookingStatusService;