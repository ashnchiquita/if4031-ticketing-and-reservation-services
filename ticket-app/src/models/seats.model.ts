import { integer, pgEnum, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { events } from "./events.model";
import { relations } from "drizzle-orm";

export const seatStatusEnum = pgEnum('seat_status', ['open', 'ongoing', 'booked']);

export const seats = pgTable(   'seats', {
    id: uuid('uuid').defaultRandom().unique().primaryKey(),
    event_id: uuid('event_id').notNull().references(() => events.id, {
        onDelete: 'cascade',
    }),
    number: integer('number').notNull(),
    status: seatStatusEnum('status').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
    unq: unique().on(t.event_id, t.number),
}));

export const seatsRelations = relations(seats, ({ one }) => ({
	event: one(events, {
		fields: [seats.event_id],
		references: [events.id],
	}),
}));