import { z } from "zod"

const getBookingQueueRequestSchema = z.object({
    query: z.object({
        seatId: z.string().optional(),
        page: z.string().optional()
        .refine((val) => {
            return !val || parseInt(val) > 0
        }, {
            message: 'page must be a positive integer'
        }),
        pageSize: z.string().optional()
        .refine((val) => {
            return !val || parseInt(val) > 0
        }, {
            message: 'pageSize must be a positive integer'
        })
    })
})

const deleteBookingQueueRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Booking ID is required."
        }).uuid({
            message: 'Invalid Booking ID.'
        }),
    })
})

export {
    getBookingQueueRequestSchema,
    deleteBookingQueueRequestSchema,
}