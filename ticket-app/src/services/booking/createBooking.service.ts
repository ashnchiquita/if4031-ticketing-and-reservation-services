import { bookings, seats } from "@/models";
import { DrizzleError, and, eq, not } from "drizzle-orm";
import { createBookingQueueService } from "../bookingQueue";
import { HttpError } from "@/utils";
import { DrizzlePool } from "@/common/types";
import createPaymentService from "../payment/createPayment.service";

export interface createBookingServiceSchema {
    seatId: string;
    userId: string;
}

const simulateExternalCall  = async () => {
    return new Promise((resolve, reject) => {
        const shouldFail = Math.random() <= 0.2;

        setTimeout(() => {
            if (shouldFail) {
                reject(new HttpError(
                    500,
                    'Failed to create booking. Please try again later.',
                ));
            } else {
                resolve('External call successful.');
            }
        }, 2000);
    });
}

const createBookingService = async (db: DrizzlePool, req: createBookingServiceSchema) => {
    console.log(`createBooking: ${JSON.stringify(req)}`);

    const { seatId, userId } = req;

    try {
        // Simulate external call
        await simulateExternalCall();
        
        const booking = await db.transaction(async (trx) => {
            // Check if booking exists
            const existingBookings = await trx.select().from(bookings).where(and(eq(bookings.seat_id, seatId), not(eq(bookings.status, "cancelled")))).limit(1);
    
            const existingBooking = existingBookings[0];
            
            if (existingBooking) {
                if (existingBooking.status === "confirmed") {
                    throw new DrizzleError({
                        message: `Seat with id ${seatId} is already booked.`,
                    });
                } else if (existingBooking.status === "pending") {
                    if (existingBooking.user_id === userId) {
                        throw new DrizzleError({
                            message: `Seat with id ${seatId} is already booked by you.`,
                        });
                    }
                    // Insert into queue
                    await createBookingQueueService(trx, {
                        seatId,
                        userId,
                    })
        
                    return null;
                }
            }
            await trx.update(seats).set({
                status: "ongoing",
            }).where(eq(seats.id, seatId));

            const res = await trx.insert(bookings).values({
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

            const booking = res[0]

            const payment = await createPaymentService({bookingId: booking.id})

            return {
                ...booking,
                paymentUrl: payment.data.paymentUrl,
            }
        })

        console.log(`[INFO] Booking created: ${JSON.stringify(booking)}`);

        if (!booking) {
            return null;
        }

        return booking;
    } catch (err) {
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