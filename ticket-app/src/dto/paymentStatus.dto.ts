import { z } from "zod";

const paymentStatusRequestSchema = z.object({
    body: z.object({
        bookingId: z.string({
            required_error: "Booking ID is required."
        }).uuid({
            message: 'Invalid booking ID.'
        }),
        status: z.string({
            required_error: "Status is required."
        }).min(1, {
            message: "Status must be at least 1 character long."
        }).max(255)
        .refine((val) => {
            return val === "success" || val === "failed"
        }, {
            message: 'Status must be either "success" or "failed".'
        }),
        message: z.string({
            required_error: "Message is required."
        }).min(1, {
            message: "Message must be at least 1 character long."
        }).max(255),
    }, {
        required_error: "Body is required."
    })
})

export {
    paymentStatusRequestSchema
}