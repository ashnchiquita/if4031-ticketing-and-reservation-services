import { Request, Response } from 'express';
import { UUID, Status } from '../lib/types';
import { InvoicesController } from '../controllers/invoices.controller';
import { types } from 'cassandra-driver';
import { ZodError } from 'zod';
import { createResponse } from '../utils/create-response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const controller = new InvoicesController();

export async function createInvoice(req: Request, res: Response) {
  // create invoice
  // return id + payment url
  // called synchronously
  try {
    const body = UUID.parse(req.body);
    const invoice = await controller.create(types.Uuid.fromString(body.bookingId));

    // generate jwt token
    const token = jwt.sign(invoice, process.env.JWT_SECRET_KEY as string);

    const data = {
      invoice: invoice,
      paymentUrl: `${process.env.PAYMENT_URL}/pay?token=${token}`,
    };

    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK, data);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }
    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

export async function pay(req: Request, res: Response) {
  // Process payment when url clicked by user
  // Result determined from the first click (first GET request)
  try {
    // Get booking id from token
    const token = req.query.token as string;
    if (!token) {
      return createResponse(res, StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'No token provided.');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    // Simulate 20% failure rate if token verified
    if (Math.floor(Math.random() * 5) === 1) {
      return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Payment failed.');
    }

    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    const body = UUID.parse(payload.bookingId);
    const invoice = await controller.update(types.Uuid.fromString(body.bookingId), true);

    // TODO: call webhook

    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK);
  } catch (err) {
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }
    return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
}
