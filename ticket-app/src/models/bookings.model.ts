import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { seats } from "./seats.model";

export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'cancelled']);

export const bookings = pgTable('bookings', {
    id: uuid('uuid').defaultRandom().unique().primaryKey(),
    seat_id: uuid('seat_id').notNull().references(() => seats.id),
    status: bookingStatusEnum('status').notNull(),
    user_id: uuid('user_id').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})