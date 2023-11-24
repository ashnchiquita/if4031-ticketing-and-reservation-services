import z from 'zod';

const getEventByIdRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Event ID is required."
        }).uuid({
            message: 'Invalid event ID.'
        })
    })
})

const getEventsRequestSchema = z.object({
    query: z.object({
        title: z.string().max(255).optional(),
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

const createEventRequestSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required."
        }).min(1, {
            message: "Title must be at least 1 character long."
        }).max(255),
    }, {
        required_error: "Body is required."
    })
})

const updateEventRequestSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required."
        }).min(1, {
            message: "Title must be at least 1 character long."
        }).max(255),
    }),
    params: z.object({
        id: z.string({
            required_error: "Event ID is required."
        }).uuid({
            message: 'Invalid event ID.'
        }),
    })
})

const deleteEventRequestSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Event ID is required."
        }).uuid({
            message: 'Invalid event ID.'
        }),
    })
})

export {
    getEventByIdRequestSchema,
    getEventsRequestSchema,
    createEventRequestSchema,
    updateEventRequestSchema,
    deleteEventRequestSchema
}