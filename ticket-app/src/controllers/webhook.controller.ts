import db from "@/database/drizzle";
import { paymentStatusService } from "@/services/webhooks";
import { JsonResponse } from "@/utils";
import { Request, Response } from "express";

const paymentStatusController = async (req: Request, res: Response) => {
    const { bookingId, status, message } = req.body;
    console.log(`paymentStatusController: received payment status update for booking with id ${bookingId}, status ${status}, and message ${message}.`);
    const booking = await paymentStatusService(db, {
        bookingId,
        status,
        message
    });

    if (!booking) {
        return new JsonResponse(res).error(404).withMessage(`Pending booking with id ${bookingId} not found.`).make();
    }
   
    return new JsonResponse(res).success().make();
}

export {
    paymentStatusController
}