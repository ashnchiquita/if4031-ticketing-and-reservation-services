import { paymentStatusController } from "@/controllers/webhook.controller";
import { paymentStatusRequestSchema } from "@/dto/paymentStatus.dto";
import { validatePayload, validateSignature } from "@/middleware";
import { tryCatchWrapper } from "@/utils";
import { Router } from "express";

const router = Router();

router.post("/payment-status", validatePayload(paymentStatusRequestSchema), tryCatchWrapper(paymentStatusController));

export default router;