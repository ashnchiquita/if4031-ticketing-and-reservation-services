import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { seats } from "./seats.model";

export const events = pgTable('events', {
    id: uuid('uuid').defaultRandom().unique().primaryKey(),
    title: varchar('title', {length: 40}).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const eventsRelations = relations(events, ({ many }) => ({
	seats: many(seats),
}));