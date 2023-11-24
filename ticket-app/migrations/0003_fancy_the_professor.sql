ALTER TABLE "seats" DROP CONSTRAINT "seats_number_unique";--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_event_id_number_unique" UNIQUE("event_id","number");