import db from "@/database/drizzle";
import { seats } from "@/models";
import { eq } from "drizzle-orm";

export interface UpdateSeatRequest { 
    id: string;
    number: number;
    status: "available" | "booked" | "sold";
    event_id: string;
}

const updateEventService = async (req: UpdateSeatRequest) => {
    console.log(`updateEvent: updating event with id ${req.id} and payload ${JSON.stringify(req)}`);

    const {id, number, status , event_id} = req;

    const res = await db.update(seats).set({
        number: number,
        status: status,
        event_id: event_id,
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
}

export default updateEventService;