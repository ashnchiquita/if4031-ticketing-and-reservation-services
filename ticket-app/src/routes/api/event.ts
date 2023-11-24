import { createEventController, deleteEventController, getEventByIdController, getEventsController, updateEventController } from "@/controllers/event.controller";
import { createEventRequestSchema, deleteEventRequestSchema, getEventByIdRequestSchema, getEventsRequestSchema, updateEventRequestSchema } from "@/dto/event.dto";
import { validatePayload } from "@/middleware";
import { tryCatchWrapper } from "@/utils";
import { Router } from "express";

const router = Router();

router.get('/', validatePayload(getEventsRequestSchema), tryCatchWrapper(getEventsController));
router.get('/:id',validatePayload(getEventByIdRequestSchema), tryCatchWrapper(getEventByIdController));
router.post('/', validatePayload(createEventRequestSchema), tryCatchWrapper(createEventController));
router.put('/:id', validatePayload(updateEventRequestSchema), tryCatchWrapper(updateEventController));
router.delete('/:id', validatePayload(deleteEventRequestSchema), tryCatchWrapper(deleteEventController));

export default router;