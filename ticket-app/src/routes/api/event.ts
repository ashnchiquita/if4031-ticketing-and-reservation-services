import { createEventController, deleteEventController, getEventByIdController, getEventsController, updateEventController } from "@/controllers/event.controller";
import { createEventRequestSchema, deleteEventRequestSchema, getEventByIdRequestSchema, getEventsRequestSchema, updateEventRequestSchema } from "@/dto/event.dto";
import { validatePayload } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get('/', validatePayload(getEventsRequestSchema), getEventsController);
router.get('/:id',validatePayload(getEventByIdRequestSchema), getEventByIdController);
router.post('/', validatePayload(createEventRequestSchema), createEventController);
router.put('/:id', validatePayload(updateEventRequestSchema), updateEventController);
router.delete('/:id', validatePayload(deleteEventRequestSchema), deleteEventController);

export default router;