import { createEventService, deleteEventService, getEventByIdService, getEventsService, updateEventService } from "@/services/event";
import {  JsonResponse } from "@/utils";
import { Request, Response } from "express";

const getEventsController = async (req: Request, res: Response) => {
    const { title, pageSize } = req.query;

    const eventList = await getEventsService({
        title: title as string,
        pageSize: pageSize as string
    });

    return new JsonResponse(res).success().withData(eventList).make();
}

const getEventByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await getEventByIdService({
        id
    });

    if (!event) {
       return new JsonResponse(res).error(404).withMessage(`Event with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(event).make();
}

const createEventController = async (req: Request, res: Response) => {
    const { title } = req.body;

    const event = await createEventService({
        title
    });

    return new JsonResponse(res).success().withData(event).make();
}

const updateEventController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    const event = await updateEventService({
        id,
        title
    });

    if (!event) {
         return new JsonResponse(res).error(404).withMessage(`Event with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(event).make();

}

const deleteEventController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await deleteEventService({
        id
    });

    if (!event) {
        return new JsonResponse(res).error(404).withMessage(`Event with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(event).make();
}

export {
    getEventsController,
    getEventByIdController,
    createEventController,
    updateEventController,
    deleteEventController
}