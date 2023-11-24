import { NextFunction, Request, Response } from "express";
import { HttpError, errorHandlerChain } from "../utils";
import bcrypt from 'bcrypt';

const authenticateAPIKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Authenticating token');
    const apiKey = req.headers['api-key'] as string
    
    if (apiKey == null) {
      throw new HttpError(401, 'No API key provided');
    }

    const clientApiKey = process.env.CLIENT_API_KEY ?? "";
    const isValid = bcrypt.compareSync(apiKey, clientApiKey);
    if (!isValid) {
      throw new HttpError(401, 'Invalid API key');
    }

    console.log('Valid API key');
    next();
  } catch (error) {
    errorHandlerChain.handle(res, error);
  }
}

export default authenticateAPIKey;