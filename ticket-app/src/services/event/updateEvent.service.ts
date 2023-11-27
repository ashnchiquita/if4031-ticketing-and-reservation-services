import { DrizzlePool } from "@/common/types";
import { events } from "@/models";
import { eq } from "drizzle-orm";

export interface UpdateEventRequest { 
    id: string;
    title: string;
}

const updateEventService = async (db: DrizzlePool, req: UpdateEventRequest) => {
    console.log(`updateEvent: updating event with id ${req.id} and title ${req.title}.`);

    const {title, id} = req;

    const res = await db.update(events).set({
        title: title,
      }).where(eq(events.id, id)).returning({
        id: events.id,
        title: events.title,
      })

    const event = res[0];
    return event;
}

export default updateEventService;