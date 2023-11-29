import { Request, Response } from 'express';
import { UUID, Status } from '../lib/types';
import { InvoicesController } from '../controllers/invoices.controller';
import { types } from 'cassandra-driver';
import { ZodError } from 'zod';
import { createResponse } from '../utils/create-response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const controller = new InvoicesController();

export async function create(req: Request, res: Response) {
  try {
    const body = UUID.parse(req.body);

    const prev = await controller.get(types.Uuid.fromString(body.bookingId));
    if (prev) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'An invoice with booking id already exists');
    }

    await controller.create(types.Uuid.fromString(body.bookingId));

    const data = await controller.get(types.Uuid.fromString(body.bookingId));
    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK, data);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }
    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const params = UUID.parse({ bookingId: req.params.booking_id });
    const body = Status.parse(req.body);
    await controller.update(types.Uuid.fromString(params.bookingId), body.status);

    const data = await controller.get(types.Uuid.fromString(params.bookingId));
    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK, data);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id or status.');
    }
    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

export async function del(req: Request, res: Response) {
  try {
    const params = UUID.parse({ bookingId: req.params.booking_id });
    await controller.delete(types.Uuid.fromString(params.bookingId));
    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }
    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const params = UUID.parse({ bookingId: req.params.booking_id });
    const data = await controller.get(types.Uuid.fromString(params.bookingId));
    if (!data) {
      return createResponse(res, StatusCodes.NOT_FOUND, 'Invoice not found.');
    }
    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK, data);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }
    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}
