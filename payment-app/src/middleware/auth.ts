import { NextFunction, Request, Response } from 'express';
import { createResponse } from '../utils/create-response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function auth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.PAYMENT_API_KEY) {
    createResponse(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    return;
  }

  next();
}
