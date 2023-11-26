import { deleteBookingQueueService, getBookingQueueService } from "@/services/bookingQueue";
import { JsonResponse } from "@/utils";
import { Request, Response } from "express";

const getBookingQueueController = async (req: Request, res: Response) => {
    const queue = await getBookingQueueService({
        seatId: req.query.seatId as string,
        page: req.query.page as string,
        pageSize: req.query.pageSize as string,
    });

    return new JsonResponse(res).success().withData(queue).make();
}

const deleteBookingQueueController = async (req: Request, res: Response) => {
    const queue = await deleteBookingQueueService({
        id: req.params.id as string,
    });

    if (!queue) {
        return new JsonResponse(res).error().withMessage(`Booking queue with id ${req.params.id} not found`).make();
    }

    return new JsonResponse(res).success().withData(queue).make();
}

export {
    getBookingQueueController,
    deleteBookingQueueController,
}