import { z } from "zod";

const getSeatByIdRequestSchema = z.object({
    params: z.object({
        id: z.string().uuid({
            message: 'Invalid seat ID.'
        })
    })
})

const getSeatsRequestSchema = z.object({
    query: z.object({
        eventId: z.string().uuid({
            message: 'Invalid event ID.'
        }).optional(),
        status: z.enum(["available", "booked", "sold"], {
            invalid_type_error: 'Invalid seat status.'
        }).optional(),
        // lastCursor: z.string().uuid({
        //     message: 'Invalid cursor ID.'
        // }).optional(),
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
        eventId: z.string().uuid({
            message: 'Invalid event ID.'
        }),
        number: z.number().int().positive(),
    }, {
        required_error: "Body is required."
    })
})

const updateSeatStatusRequestSchema = z.object({
    body: z.object({
        status: z.enum(["available", "booked", "sold"], {
            invalid_type_error: 'Invalid seat status.'
        }),
    }),
    params: z.object({
        id: z.string().uuid({
            message: 'Invalid seat ID.'
        }),
    })
})

const updateSeatRequestSchema = z.object({
    body: z.object({
        number: z.number().int().positive(),
        status: z.enum(["available", "booked", "sold"], {
            invalid_type_error: 'Invalid seat status.'
        }),
        eventId: z.string().uuid({
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
        id: z.string().uuid({
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