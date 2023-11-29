import env from "@/config/env";
import { HttpError, Logger } from "@/utils";

export interface CreatePaymentRequest {
    bookingId: string;
}

const createPaymentService = async (req: CreatePaymentRequest) => {
    Logger.info(`Calling payment service for ${req.bookingId}`)
    try {
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
    
        Logger.info("Payment service response: ", resData);
        
        return resData;
    } catch (err) {
        if (err instanceof Error) {
            console.error("[ERROR] Payment service failed.")
            throw new HttpError(500, "Payment service failed.");
        }

        throw err;
    }
} 

export default createPaymentService;