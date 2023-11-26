import { createBookingService, deleteBookingService, getBookingByIdService, getBookingsService, updateBookingStatusService } from "@/services/booking";
import { JsonResponse } from "@/utils";
import { Request, Response } from "express";

const getBookingByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await getBookingByIdService({
        id
    });

    if (!booking) {
        return new JsonResponse(res).error(404).withMessage(`Booking with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(booking).make();
}

const getBookingsController = async (req: Request, res: Response) => {
    const { page, pageSize, status, userId, seatId } = req.query;
    
    const bookingList = await getBookingsService({
        page: page as string,
        pageSize: pageSize as string,
        status: status as "pending" | "confirmed" | "cancelled",
        userId: userId as string,
        seatId: seatId as string,
    });

    return new JsonResponse(res).success().withData(bookingList).make();
}

const createBookingController = async (req: Request, res: Response) => {
    const { seatId, userId } = req.body;

    const booking = await createBookingService({
        seatId,
        userId,
    });

    if (!booking) {
        return new JsonResponse(res).success().withMessage(`You are in the queue for seat id ${seatId}`).make();
    }

    return new JsonResponse(res).success().withData(booking).make();
}

const updateBookingStatusController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await updateBookingStatusService({
        id: id as string,
        status: status as "pending" | "confirmed" | "cancelled",
    });

    if (!booking) {
        return new JsonResponse(res).error(404).withMessage(`Booking with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(booking).make();
}

const deleteBookingController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await deleteBookingService({
        id
    });

    if (!booking) {
        return new JsonResponse(res).error(404).withMessage(`Booking with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withMessage(`Booking with id ${id} has been deleted.`).make();
}

export {
    getBookingByIdController,
    getBookingsController,
    createBookingController,
    updateBookingStatusController,
    deleteBookingController,
}