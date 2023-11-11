ALTER TABLE "seats" DROP CONSTRAINT "seats_event_id_events_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seats" ADD CONSTRAINT "seats_event_id_events_uuid_fk" FOREIGN KEY ("event_id") REFERENCES "events"("uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
