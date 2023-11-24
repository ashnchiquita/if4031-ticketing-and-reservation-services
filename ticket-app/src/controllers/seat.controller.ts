import { createSeatService, deleteSeatService, getSeatByIdService, getSeatsService, updateSeatService, updateSeatStatusService } from "@/services/seat";
import { JsonResponse } from "@/utils";
import { Request, Response } from "express";

const getSeatByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const seat = await getSeatByIdService({
        id
    });

    if (!seat) {
       return new JsonResponse(res).error(404).withMessage(`Seat with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(seat).make();
}

const getSeatsController = async (req: Request, res: Response) => {
    const { page, pageSize, eventId, status } = req.query;
    
    const seatList = await getSeatsService({
        page: page as string,
        pageSize: pageSize as string,
        eventId: eventId as string,
        status: status as "available" | "booked" | "sold"
    });

    return new JsonResponse(res).success().withData(seatList).make();
}

const createSeatController = async (req: Request, res: Response) => {
    const { eventId, number } = req.body;

    const seat = await createSeatService({
        eventId,
        number
    });

    return new JsonResponse(res).success().withData(seat).make();
}

const updateSeatController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, number, event_id } = req.body;

    const seat = await updateSeatService({
       id: id as string,
       status: status as "available" | "booked" | "sold",
       number: number,
       eventId: event_id,
    });

    if (!seat) {
         return new JsonResponse(res).error(404).withMessage(`Seat with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(seat).make();
}

const updateSeatStatusController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const seat = await updateSeatStatusService({
        id: id as string,
        status: status as "available" | "booked" | "sold",
    });

    if (!seat) {
         return new JsonResponse(res).error(404).withMessage(`Seat with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(seat).make();
}

const deleteSeatController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const seat = await deleteSeatService({
        id
    });

    if (!seat) {
         return new JsonResponse(res).error(404).withMessage(`Seat with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(seat).make();
}

export {
    getSeatByIdController,
    getSeatsController,
    createSeatController,
    updateSeatController,
    updateSeatStatusController,
    deleteSeatController
}