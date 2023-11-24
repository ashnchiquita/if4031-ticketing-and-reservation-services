import { Request, Response } from "express";
import { errorHandlerChain } from ".";

export type Handler = (req: Request, res: Response) => Promise<Response>

const tryCatchWrapper = (
    handler: Handler
) => {
    return async (req: Request, res: Response) => {
        try {
          await handler(req, res);
        } catch (error) {   
          errorHandlerChain.handle(res, error);
        }
    };
}

export default tryCatchWrapper;