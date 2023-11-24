import { createSeatController, deleteSeatController, getSeatByIdController, getSeatsController, updateSeatController, updateSeatStatusController } from "@/controllers/seat.controller";
import { createSeatRequestSchema, deleteSeatRequestSchema, getSeatByIdRequestSchema, getSeatsRequestSchema, updateSeatRequestSchema, updateSeatStatusRequestSchema } from "@/dto/seats.dto";
import { validatePayload } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get('/', validatePayload(getSeatsRequestSchema), getSeatsController);
router.get('/:id', validatePayload(getSeatByIdRequestSchema), getSeatByIdController);
router.post('/', validatePayload(createSeatRequestSchema), createSeatController);
router.put('/:id', validatePayload(updateSeatRequestSchema), updateSeatController);
router.patch('/:id/status', validatePayload(updateSeatStatusRequestSchema), updateSeatStatusController);
router.delete('/:id', validatePayload(deleteSeatRequestSchema), deleteSeatController);

export default router;