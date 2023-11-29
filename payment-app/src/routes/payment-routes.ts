import { Request, Response } from 'express';
import { UUID, Status } from '../lib/types';
import { InvoicesController } from '../controllers/invoices.controller';
import { types } from 'cassandra-driver';
import { ZodError } from 'zod';
import { createResponse } from '../utils/create-response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import updateWebhook from '../utils/webhook';
import enqueue from '../utils/queue';

const controller = new InvoicesController();

export async function createInvoice(req: Request, res: Response) {
  // create invoice
  // return id + payment url
  // called synchronously
  try {
    console.log('createInvoice: Checking booking');
    const body = UUID.parse(req.body);

    const prev = await controller.get(types.Uuid.fromString(body.bookingId));
    if (prev) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'An invoice with booking id already exists');
    }

    console.log('createInvoice: Creating invoice...');
    await controller.create(types.Uuid.fromString(body.bookingId));

    const invoice = await controller.get(types.Uuid.fromString(body.bookingId));

    if (!invoice) throw new Error();

    console.log('createInvoice: Creating payment URL...');
    // generate jwt token
    const token = jwt.sign(invoice, process.env.JWT_SECRET as string);

    const data = {
      invoice: invoice,
      paymentUrl: `http://${process.env.PAYMENT_SERVICE_HOST}:${process.env.PAYMENT_SERVICE_PORT}/payment?token=${token}`,
    };
    console.log(`createInvoice: returned ${data}`);

    return createResponse(res, StatusCodes.OK, ReasonPhrases.OK, data);
  } catch (err) {
    console.error('createInvoice: Error creating invoice: ', err);
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
    console.log('pay: Validating token...');
    const token = req.query.token as string;
    if (!token) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'No token provided.');
    }

    jwt.verify(token, process.env.JWT_SECRET as string);
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const body = UUID.parse({ bookingId: payload.bookingId });

    // Check if link has been clicked before
    console.log('pay: Validating payment status...');
    const data = await controller.get(types.Uuid.fromString(body.bookingId));
    if (data.status !== 'pending') {
      console.log('pay: Link already clicked');
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Payment already performed.');
    }

    let paymentStatus = 'success';
    // Simulate 10% failure rate if token verified
    if (Math.floor(Math.random() * 10) === 1) {
      console.log('pay: Payment simulation failed');
      paymentStatus = 'failed';
    }

    console.log('pay: paymentStatus after random = ', paymentStatus);
    await controller.update(types.Uuid.fromString(body.bookingId), paymentStatus);

    const bookingId = body.bookingId;
    const status = paymentStatus;
    const message = `${paymentStatus.charAt(0).toUpperCase()}${paymentStatus.slice(1)}`;
    // Enqueue job
    console.log('pay: Enqueuing webhook as job...');
    enqueue({ bookingId, status, message });

    return paymentStatus === 'success'
      ? createResponse(res, StatusCodes.OK, 'Payment success.')
      : createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Payment failed.');
  } catch (err) {
    console.log(`pay: Error: ${err}`);
    if (err instanceof ZodError) {
      return createResponse(res, StatusCodes.BAD_REQUEST, 'Invalid booking id.');
    }

    if (err instanceof JsonWebTokenError) {
      return createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error, try again later.');
  }
}
