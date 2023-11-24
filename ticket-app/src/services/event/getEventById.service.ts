import db from "@/database/drizzle";
import { events } from "@/models";
import { eq } from "drizzle-orm";

export interface GetEventByIdRequest {
    id: string;
}

const getEventByIdService = async (req: GetEventByIdRequest) => {
    console.log(`getEventByIdService: ${JSON.stringify(req)}`);
    const res = await db.select({
        title: events.title,
        id: events.id,
        created_at: events.created_at,
        updated_at: events.updated_at,
    }).from(events)
        .where(eq(events.id, req.id))
        
    const event = res[0]
    return event;
}

export default getEventByIdService;