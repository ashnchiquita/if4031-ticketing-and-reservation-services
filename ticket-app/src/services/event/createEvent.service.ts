import { DrizzlePool } from "@/common/types";
import { events } from "@/models";

export interface CreateEventRequestSchema {
    title: string;
}

const createEventService = async (db: DrizzlePool, req: CreateEventRequestSchema) => {
    console.log(`createEvent: creating event with title ${req.title}.`);

    const res = await db.insert(events).values({
        title: req.title
    }).returning({
        id: events.id,
        title: events.title,
    })

    const event = res[0];
    return event;
}

export default createEventService;