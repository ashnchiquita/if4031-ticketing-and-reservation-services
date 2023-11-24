import db from "@/database/drizzle";
import { seats } from "@/models";
import { eq } from "drizzle-orm";

export interface GetSeatByIdRequest {
    id: string;
}

const getSeatByIdService = async (req: GetSeatByIdRequest) => {
    console.log(`getSeatByIdService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.select({
        id: seats.id,
        number: seats.number,
        status: seats.status,
        event_id: seats.event_id,
        created_at: seats.created_at,
        updated_at: seats.updated_at,
    }).from(seats).where(eq(seats.id, id));
            
    return res[0];
}

export default getSeatByIdService;