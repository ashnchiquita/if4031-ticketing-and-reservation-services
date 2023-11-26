DROP TABLE IF EXISTS "booking_queue";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking_queue" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seat_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "booking_queue_seat_id_user_id_unique" UNIQUE("seat_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking_queue" ADD CONSTRAINT "booking_queue_seat_id_seats_uuid_fk" FOREIGN KEY ("seat_id") REFERENCES "seats"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;