import env from "@/config/env";
import { HttpError } from "@/utils";

export interface CreatePaymentRequest {
    bookingId: string;
}

const createPaymentService = async (req: CreatePaymentRequest) => {
    console.log(`[INFO] Calling payment service for ${req.bookingId}`)
    const res = await fetch(`${env.PAYMENT_APP_URL}/payment`, {
        method: 'POST',
        body: JSON.stringify({
            bookingId: req.bookingId,
        }),
        headers: {
            'x-api-key': env.PAYMENT_OUTBOUND_API_KEY,
            'Content-Type': 'application/json'
        },
    })

    if (!res.ok) {
        console.error("[ERROR] Payment service failed.")
        throw new HttpError(500, "Payment service failed.");
    }

    const resData = await res.json();

    console.log("[INFO] Payment service response: ", resData);
    
    return resData;
}

export default createPaymentService;