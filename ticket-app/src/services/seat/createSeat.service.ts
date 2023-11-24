import db from "@/database/drizzle";
import { seats } from "@/models";
import { DrizzleError } from "drizzle-orm";

export interface createSeatRequestSchema {
    eventId: string;
    number: number;
}

const createSeatService = async (req: createSeatRequestSchema) => {
    console.log(`createSeat: creating seat with event id ${req.eventId} and number ${req.number}.`);

    const { eventId, number } = req;

    try {
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
    } catch (err) {
        console.log("createSeat: error inserting seat into database.");
        console.log(err);
        if (err instanceof Error) {
            if (err.message === 'duplicate key value violates unique constraint "seats_event_id_number_unique"') {
                throw new DrizzleError({
                    message: `Seat number ${number} already exists.`,
                });
            }

            if (err.message === 'insert or update on table "seats" violates foreign key constraint "seats_event_id_events_uuid_fk"') {
                throw new DrizzleError({
                    message: `Event with id ${eventId} does not exist.`,
                });
            }
        }
        throw err;
    }
}

export default createSeatService;