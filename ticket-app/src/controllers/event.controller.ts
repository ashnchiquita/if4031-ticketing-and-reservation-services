import db from "@/database/drizzle";
import { createEventService, deleteEventService, getEventByIdService, getEventsService, updateEventService } from "@/services/event";
import {  JsonResponse } from "@/utils";
import { Request, Response } from "express";

const getEventsController = async (req: Request, res: Response) => {
    const { title, pageSize, page } = req.query;

    const eventList = await getEventsService(db, {
        title: title as string,
        page: page as string,
        pageSize: pageSize as string
    });

    return new JsonResponse(res).success().withData(eventList).make();
}

const getEventByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await getEventByIdService(db, {
        id
    });

    if (!event) {
       return new JsonResponse(res).error(404).withMessage(`Event with id ${id} not found.`).make();
    }

    return new JsonResponse(res).success().withData(event).make();
}

const createEventController = async (req: Request, res: Response) => {
    const { title } = req.body;

    const event = await createEventService(db, {
        title
    });

    return new JsonResponse(res).success().withData(event).make();
}

const updateEventController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    const event = await updateEventService(db, {
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

    const event = await deleteEventService(db, {
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