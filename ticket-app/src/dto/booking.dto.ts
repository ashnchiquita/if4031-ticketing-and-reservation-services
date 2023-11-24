import { z } from "zod";

const getBookingByIdRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Booking ID is required."
        }).uuid({
            message: 'Invalid Booking ID.'
        })
    })
})

const getBookingsRequestSchema = z.object({
    query: z.object({
        eventId: z.string().optional(),
        status: z.string().optional()
        .refine((val) => {
            return !val || ["pending", "confirmed", "cancelled"].includes(val)
        }, {
            message: 'status must be "pending", "confirmed", or "cancelled"'
        }),
        // lastCursor: z.string().uuid({
        //     message: 'Invalid cursor ID.'
        // }).optional(),
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

const createBookingRequestSchema = z.object({
    body: z.object({
        userId: z.string({
            required_error: "User ID is required."
        }).uuid({
            message: 'Invalid user ID.'
        }),
        seatId: z.string({
            required_error: "Seat ID is required."
        }).uuid({
            message: 'Invalid seat ID.'
        }),
    }, {
        required_error: "Body is required."
    })
})

const updateBookingStatusRequestSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "confirmed", "cancelled"], {
            invalid_type_error: 'Invalid Booking status.',
            required_error: "Booking status is required."
        }),
    }),
    params: z.object({
        id: z.string({
            required_error: "Booking ID is required."
        }).uuid({
            message: 'Invalid Booking ID.'
        }),
    })
})

const deleteBookingRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Booking ID is required."
        }).uuid({
            message: 'Invalid Booking ID.'
        }),
    })
})

export {
    getBookingByIdRequestSchema,
    getBookingsRequestSchema,
    createBookingRequestSchema,
    updateBookingStatusRequestSchema,
    deleteBookingRequestSchema
}