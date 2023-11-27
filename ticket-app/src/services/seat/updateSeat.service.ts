import { DrizzlePool } from "@/common/types";
import { seats } from "@/models";
import { DrizzleError, eq } from "drizzle-orm";

export interface UpdateSeatRequest { 
    id: string;
    number: number;
    status: "open" | "ongoing" | "booked";
    eventId: string;
}

const updateEventService = async (db: DrizzlePool, req: UpdateSeatRequest) => {
    console.log(`updateEvent: updating event with id ${req.id} and payload ${JSON.stringify(req)}`);

    const {id, number, status , eventId} = req;

    try {
      const res = await db.update(seats).set({
          number: number,
          status: status,
          event_id: eventId,
        }).where(eq(seats.id, id)).returning({
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
      console.log("updateEvent: error updating event in database.");
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

export default updateEventService;