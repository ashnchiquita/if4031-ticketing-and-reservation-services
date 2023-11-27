import { DrizzlePool } from "@/common/types";
import { seats } from "@/models";
import { eq } from "drizzle-orm";

export interface DeleteSeatRequest {
    id: string;
}

const deleteSeatService = async (db: DrizzlePool, req: DeleteSeatRequest) => {
    console.log(`deleteSeatService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.delete(seats).where(eq(seats.id, id))
    .returning({
        id: seats.id,
        number: seats.number,
        status: seats.status,
        event_id: seats.event_id,
        created_at: seats.created_at,
        updated_at: seats.updated_at,
    })
            
    return res[0];
}

export default deleteSeatService;