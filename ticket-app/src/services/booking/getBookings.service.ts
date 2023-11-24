import db from "@/database/drizzle";
import { bookings } from "@/models";
import { and, eq } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";

export interface GetBookingsRequest {
    status?: "pending" | "confirmed" | "cancelled";
    userId?: string;
    page?: string;
    pageSize?: string;
}

function withFilter<T extends PgSelect>(qb: T, status?: "pending" | "confirmed" | "cancelled", userId?: string) {
    if (status && userId) {
        return qb.where(and(eq(bookings.status, status), eq(bookings.user_id, userId)))
    }

    if (status) {
        return qb.where(eq(bookings.status, status))
    }

    if (userId) {
        return qb.where(eq(bookings.user_id, userId))
    }

    return qb
}

const getBookingsService = async (req: GetBookingsRequest) => {
    console.log(`getBookingsService: ${JSON.stringify(req)}`);
    const pageSize = req.pageSize ? parseInt(req.pageSize) : 25;
    const userId = req.userId
    const status = req.status
    const page = req.page ? Math.max(parseInt(req.page), 1) : 1;

    let seatList = db.select({
        id: bookings.id,
        seat_id: bookings.seat_id,
        user_id: bookings.user_id,
        status: bookings.status,
        created_at: bookings.created_at,
        updated_at: bookings.updated_at,
    }).from(bookings)
                .orderBy(bookings.created_at)
                .limit(pageSize)
                .offset(pageSize * (page - 1))
                .$dynamic();
                
    if (userId || status) {
        seatList = withFilter(seatList, status, userId)
    } 

    return seatList
}

export default getBookingsService;