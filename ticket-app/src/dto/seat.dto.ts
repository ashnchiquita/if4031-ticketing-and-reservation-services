import { z } from "zod";

const getSeatByIdRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Seat ID is required."
        }).uuid({
            message: 'Invalid seat ID.'
        })
    })
})

const getSeatsRequestSchema = z.object({
    query: z.object({
        eventId: z.string().optional(),
        status: z.string().optional()
        .refine((val) => {
            return !val || ["available", "booked", "sold"].includes(val)
        }, {
            message: 'status must be "available", "booked", or "sold"'
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

const createSeatRequestSchema = z.object({
    body: z.object({
        eventId: z.string({
            required_error: "Event ID is required."
        }).uuid({
            message: 'Invalid event ID.'
        }),
        number: z.number({
            required_error: "Seat number is required."
        }).int().positive(),
    }, {
        required_error: "Body is required."
    })
})

const updateSeatStatusRequestSchema = z.object({
    body: z.object({
        status: z.enum(["available", "booked", "sold"], {
            invalid_type_error: 'Invalid seat status.',
            required_error: "Seat status is required."
        }),
    }),
    params: z.object({
        id: z.string({
            required_error: "Seat ID is required."
        }).uuid({
            message: 'Invalid seat ID.'
        }),
    })
})

const updateSeatRequestSchema = z.object({
    body: z.object({
        number: z.number({
            required_error: "Seat number is required."
        }).int().positive(),
        status: z.enum(["available", "booked", "sold"], {
            invalid_type_error: 'Invalid seat status.',
            required_error: "Seat status is required."
        }),
        eventId: z.string({
            required_error: "Event ID is required."
        }).uuid({
            message: 'Invalid event ID.'
        })
    }),
    params: z.object({
        id: z.string().uuid({
            message: 'Invalid seat ID.'
        }),
    })

})

const deleteSeatRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Seat ID is required."
        }).uuid({
            message: 'Invalid seat ID.'
        }),
    })
})

export {
    getSeatByIdRequestSchema,
    getSeatsRequestSchema,
    createSeatRequestSchema,
    updateSeatStatusRequestSchema,
    updateSeatRequestSchema,
    deleteSeatRequestSchema
}