import { HttpError } from "@/utils";

export interface CreatePaymentRequest {
    bookingId: string;
}

const createPaymentService = async (req: CreatePaymentRequest) => {
    console.log(`[INFO] Calling payment service for ${req.bookingId}`)
    const res = await fetch('http://host.docker.internal:3003/api/payment', {
        method: 'POST',
        body: JSON.stringify({
            bookingId: req.bookingId,
        }),
        headers: {
            'x-api-key': "apikey",
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