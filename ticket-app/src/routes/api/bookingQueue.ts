import { deleteBookingQueueController, getBookingQueueController } from "@/controllers/bookingQueue.controller";
import { deleteBookingQueueRequestSchema, getBookingQueueRequestSchema } from "@/dto/bookingQueue.dto";
import { validatePayload } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get("/", validatePayload(getBookingQueueRequestSchema), getBookingQueueController)
router.delete("/:id", validatePayload(deleteBookingQueueRequestSchema), deleteBookingQueueController)

export default router;