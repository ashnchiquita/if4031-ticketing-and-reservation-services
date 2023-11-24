import db from "@/database/drizzle";
import { events } from "@/models";
import { ilike } from "drizzle-orm";

export interface GetEventsRequest  {
    title: string;
    pageSize?: string;
    page?: string;
}

const getEventsService = async (req: GetEventsRequest) => {
    const title = req.title ? req.title : '';
    const pageSize = req.pageSize ? Math.max(parseInt(req.pageSize), 0) : 25;
    const page = req.page ? Math.max(parseInt(req.page), 1) : 1;

    console.log(`getEvents: title=${title}, pageSize=${pageSize}`)
    const eventList = db.select({
        title: events.title,
        id: events.id,
        created_at: events.created_at,
        updated_at: events.updated_at,
    }).from(events)
        .orderBy(events.created_at)
        .limit(pageSize)
        .offset(pageSize * (page - 1))
        .where(ilike(events.title, `%${title}%`))

    return eventList;
} 

export default getEventsService;