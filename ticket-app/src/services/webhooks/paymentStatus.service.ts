import { getBookingByIdService, updateBookingStatusService } from "../booking";
import producer from "@/utils/amqp/producer";
import { eq } from "drizzle-orm";
import { seats } from "@/models";
import { generatePaymentStatusPDF } from "@/utils/pdfgenerator";
import { DrizzlePool } from "@/common/types";

export interface PaymentStatusRequest {
    bookingId: string;
    status: "success" | "failed";
    message: string;
}

const paymentStatusService =  async (db: DrizzlePool, req: PaymentStatusRequest) => {
    const { bookingId, status, message } = req;
    console.log(`paymentStatusService: ${JSON.stringify(req)}`);

    return await db.transaction(async (trx) => {
        const booking = await updateBookingStatusService(trx, {
            id: bookingId,
            status: status === "success" ? "confirmed" : "cancelled"
        }, ["pending"]);
        
        if (!booking) {
            return null
        }
    
        const seatDetail = await trx.query.seats.findFirst({
            where: eq(seats.id, booking.seat_id),
            with: {
                event: {
                    columns: {
                        title: true
                    }
                }
            },
            columns: {
                number: true,
                event_id: true,
            }
        })
    
        const bookingDetail = {
            ...booking,
            seat: seatDetail,
            message: message,
        }
    
        // TODO! Create and upload PDF to s3
        console.log(`paymentStatusService: generate PDF...`);
        generatePaymentStatusPDF(bookingDetail);
    
        // TODO! Send to client's message queue
        console.log(`paymentStatusService: sending message to client's message queue.`);
        // const msg = {
        //     action: '..',
        //     data: {  },
        // }
        // producer(JSON.stringify(msg))
        return bookingDetail;

    })
}

export default paymentStatusService;