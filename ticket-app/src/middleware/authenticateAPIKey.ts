import { NextFunction, Request, Response } from "express";
import { HttpError, Logger, errorHandlerChain } from "../utils";
import bcrypt from 'bcrypt';
import env from "@/config/env";

const authenticateAPIKey = (extApiKey: string) => async  (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.info('Authenticating token');
    const apiKey = req.headers['api-key'] as string
    
    if (apiKey == null) {
      throw new HttpError(401, 'No API key provided');
    }

    const isValid = bcrypt.compareSync(apiKey, extApiKey);
    if (!isValid) {
      throw new HttpError(401, 'Invalid API key');
    }

    Logger.info('Valid API key');
    next();
  } catch (error) {
    errorHandlerChain.handle(res, error);
  }
}

const authenticateClientAPIKey = authenticateAPIKey(env.CLIENT_API_KEY);
const authenticatePaymentAPIKey = authenticateAPIKey(env.PAYMENT_API_KEY);

export {
  authenticateClientAPIKey,
  authenticatePaymentAPIKey
};