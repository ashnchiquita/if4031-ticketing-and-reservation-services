import db from "@/database/drizzle";
import { seats } from "@/models";
import { and, eq } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";

export interface GetSeatsRequest {
    eventId?: string;
    status?: "open" | "ongoing" | "booked";
    page?: string;
    pageSize?: string;
}

function withFilter<T extends PgSelect>(qb: T, status?: "open" | "ongoing" | "booked", eventId?: string) {
    if (status && eventId) {
        return qb.where(and(eq(seats.status, status), eq(seats.event_id, eventId)))
    }

    if (status) {
        return qb.where(eq(seats.status, status))
    }

    if (eventId) {
        return qb.where(eq(seats.event_id, eventId))
    }

    return qb
}

const getSeatsService = async (req: GetSeatsRequest) => {
    console.log(`getSeatsService: ${JSON.stringify(req)}`);
    const pageSize = req.pageSize ? parseInt(req.pageSize) : 25;
    const eventId = req.eventId
    const status = req.status
    const page = req.page ? Math.max(parseInt(req.page), 1) : 1;

    let seatList = db.select().from(seats)
                .orderBy(seats.created_at)
                .limit(pageSize)
                .offset(pageSize * (page - 1))
                .$dynamic();
                
    if (eventId || status) {
        seatList = withFilter(seatList, status, eventId)
    } 

    return seatList
}

export default getSeatsService;