import db from "@/database/drizzle";
import { seats } from "@/models";

export interface createSeatRequestSchema {
    eventId: string;
    number: number;
}

const createSeatService = async (req: createSeatRequestSchema) => {
    console.log(`createSeat: creating seat with event id ${req.eventId} and number ${req.number}.`);

    const { eventId, number } = req;
    const res = await db.insert(seats).values({
        event_id: eventId,
        number: number,
        status: "available"
    }).returning({
        id: seats.id,
        number: seats.number,
        status: seats.status,
        event_id: seats.event_id,
        created_at: seats.created_at,
        updated_at: seats.updated_at,
    })

    const event = res[0];
    return event;
}

export default createSeatService;