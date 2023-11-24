import { createSeatController, deleteSeatController, getSeatByIdController, getSeatsController, updateSeatController, updateSeatStatusController } from "@/controllers/seat.controller";
import { createSeatRequestSchema, deleteSeatRequestSchema, getSeatByIdRequestSchema, getSeatsRequestSchema, updateSeatRequestSchema, updateSeatStatusRequestSchema } from "@/dto/seat.dto";
import { validatePayload } from "@/middleware";
import { tryCatchWrapper } from "@/utils";
import { Router } from "express";

const router = Router();

router.get('/', validatePayload(getSeatsRequestSchema), tryCatchWrapper(getSeatsController));
router.get('/:id', validatePayload(getSeatByIdRequestSchema), tryCatchWrapper(getSeatByIdController));
router.post('/', validatePayload(createSeatRequestSchema), tryCatchWrapper(createSeatController));
router.put('/:id', validatePayload(updateSeatRequestSchema), tryCatchWrapper(updateSeatController));
router.patch('/:id/status', validatePayload(updateSeatStatusRequestSchema), tryCatchWrapper(updateSeatStatusController));
router.delete('/:id', validatePayload(deleteSeatRequestSchema), tryCatchWrapper(deleteSeatController));

export default router;