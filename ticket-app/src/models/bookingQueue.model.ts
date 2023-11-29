import { index, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { seats } from "./seats.model";

export const bookingQueue = pgTable('booking_queue', {
    id: uuid('uuid').defaultRandom().unique().primaryKey(),
    seat_id: uuid('seat_id').notNull().references(() => seats.id),
    user_id: uuid('user_id').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
    unq: unique().on(t.seat_id, t.user_id),
    seatIdIdx: index("seat_id_idx").on(t.seat_id),
}))