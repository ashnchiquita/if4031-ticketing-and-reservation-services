import { HttpError } from "@/utils";
import { getBookingByIdService, updateBookingStatusService } from "../booking";

export interface PaymentStatusRequest {
    bookingId: string;
    status: "success" | "failed";
    message: string;
}

const paymentStatusService =  async (paymentStatusRequest: PaymentStatusRequest) => {
    const { bookingId, status, message } = paymentStatusRequest;
    console.log(`paymentStatusService: ${JSON.stringify(paymentStatusRequest)}`);

    const existingBooking = await getBookingByIdService({ id: bookingId });

    if (!existingBooking) {
        throw new HttpError(404, `Booking with id ${bookingId} not found.`);
    }
    
    if (existingBooking.status !== "pending") {
        throw new HttpError(400, `Booking with id ${bookingId} is not pending.`);
    }


    const booking = await updateBookingStatusService({
        id: bookingId,
        status: status === "success" ? "confirmed" : "cancelled"
    });

    // TODO! Send to client's message queue
    console.log(`paymentStatusService: sending message to client's message queue.`);
    return booking;
}

export default paymentStatusService;