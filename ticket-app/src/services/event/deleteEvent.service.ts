import { DrizzlePool } from "@/common/types";
import { events } from "@/models";
import { Logger } from "@/utils";
import { eq } from "drizzle-orm";

export interface DeleteEventRequest {
    id: string;
}

const deleteEventService = async (db: DrizzlePool, req: DeleteEventRequest) => {
    Logger.info(`deleteEventService: ${JSON.stringify(req)}`);
    const {id} = req;
    const res = await db.delete(events).where(eq(events.id, id))
                .returning({
                    id: events.id,
                    title: events.title
                })
            
    return res[0];
}

export default deleteEventService;