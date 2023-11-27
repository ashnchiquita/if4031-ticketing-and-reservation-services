import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/models"

export type DrizzlePool = NodePgDatabase<typeof schema>

export type BookingStatus = "pending" | "confirmed" | "cancelled";