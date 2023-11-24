import db from "@/database/drizzle";
import { seats } from "@/models";
import { eq } from "drizzle-orm";

export interface UpdateSeatStatusRequest { 
    id: string;
    status: "available" | "booked" | "sold";
}

const updateSeatStatusService = async (req: UpdateSeatStatusRequest) => {
    console.log(`updateSeatStatus: updating seat with id ${req.id} and status ${req.status}.`);

    const {status, id} = req;

    const res = await db.update(seats).set({
        status: status,
      }).where(eq(seats.id, id)).returning({
        id: seats.id,
        number: seats.number,
        status: seats.status,
        event_id: seats.event_id,
        created_at: seats.created_at,
        updated_at: seats.updated_at,
      })

    const seat = res[0];
    return seat;
}

export default updateSeatStatusService;