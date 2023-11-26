import db from "@/database/drizzle";
import { bookings } from "@/models";
import { and, eq } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";

export interface GetBookingsRequest {
    status?: "pending" | "confirmed" | "cancelled";
    userId?: string;
    seatId?: string;
    page?: string;
    pageSize?: string;
}

function withFilter<T extends PgSelect>(qb: T, status?: "pending" | "confirmed" | "cancelled", userId?: string, seatId?: string) {
    const condition = []
    if (status) {
        condition.push(eq(bookings.status, status))
    }

    if (userId) {
        condition.push(eq(bookings.user_id, userId))
    }

    if (seatId) {
        condition.push(eq(bookings.seat_id, seatId))
    }

    return qb.where(and(...condition))
}

const getBookingsService = async (req: GetBookingsRequest) => {
    console.log(`getBookingsService: ${JSON.stringify(req)}`);
    const pageSize = req.pageSize ? parseInt(req.pageSize) : 25;
    const userId = req.userId
    const seatId = req.seatId
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
                
    if (userId || status || seatId) {
        seatList = withFilter(seatList, status, userId, seatId)
    } 

    return seatList
}

export default getBookingsService;