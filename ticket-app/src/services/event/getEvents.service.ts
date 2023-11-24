import db from "@/database/drizzle";
import { events } from "@/models";
import { and, gt, ilike } from "drizzle-orm";

export interface GetEventsRequest  {
    title: string;
    pageSize?: string;
}

const getEventsService = async (req: GetEventsRequest) => {
    const title = req.title ? req.title : '';
    const pageSize = req.pageSize ? parseInt(req.pageSize) : 25;

    console.log(`getEvents: title=${title}, pageSize=${pageSize}`)
    const eventList = await db.select({
        title: events.title,
        id: events.id,
        created_at: events.created_at,
        updated_at: events.updated_at,
    }).from(events)
        .orderBy(events.created_at)
        .limit(pageSize)
        .where(ilike(events.title, `%${title}%`))

    return eventList;
} 

export default getEventsService;