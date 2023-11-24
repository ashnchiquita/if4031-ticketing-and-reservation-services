import { getBookingByIdController, getBookingsController, createBookingController, deleteBookingController ,updateBookingStatusController } from "@/controllers/booking.controller";
import { getBookingByIdRequestSchema, getBookingsRequestSchema, createBookingRequestSchema, deleteBookingRequestSchema, updateBookingStatusRequestSchema} from "@/dto/booking.dto";
import { validatePayload } from "@/middleware";
import { tryCatchWrapper } from "@/utils";
import { Router } from "express";

const router = Router();

router.get("/", validatePayload(getBookingsRequestSchema), tryCatchWrapper(getBookingsController));
router.get("/:id", validatePayload(getBookingByIdRequestSchema), tryCatchWrapper(getBookingByIdController));
router.post("/", validatePayload(createBookingRequestSchema), tryCatchWrapper(createBookingController));
router.patch("/:id/status", validatePayload(updateBookingStatusRequestSchema), tryCatchWrapper(updateBookingStatusController));
router.delete("/:id", validatePayload(deleteBookingRequestSchema), tryCatchWrapper(deleteBookingController));

export default router;