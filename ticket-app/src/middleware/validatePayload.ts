import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { errorHandlerChain } from "@/utils";

const validatePayload = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
        errorHandlerChain.handle(res, error);
    }
};

export default validatePayload;