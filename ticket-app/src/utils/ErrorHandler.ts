import { Response } from "express";
import JsonResponse from "./JsonResponse";
import HttpError, { HttpStatusCode } from "./HttpError";
import { ZodError } from "zod";
import { DrizzleError } from "drizzle-orm";

abstract class ErrorHandler {
    protected nextHandler?: ErrorHandler;

    setNextHandler(nextHandler: ErrorHandler): ErrorHandler {
        this.nextHandler = nextHandler;
        return this;
    }

    handle(res: Response, error: unknown): Response {
        const jsonResponse = new JsonResponse(res);
        if (this.canHandle(error)) {
            return this.getResponse(jsonResponse, error);
        } else if (this.nextHandler) {
            return this.nextHandler.handle(res, error);
        } else {
            return jsonResponse
                .error(HttpStatusCode.InternalServerError)
                .withMessage('Something went wrong while processing your request')
                .make();
        }
    }

    protected abstract canHandle(error: unknown): boolean;
    protected abstract getResponse(jsonResponse: JsonResponse, error: unknown): Response;
}

class HttpErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof HttpError;
    }

    protected getResponse(jsonResponse: JsonResponse, error: HttpError): Response {
        return jsonResponse
                .error(error.statusCode)
                .withData(error.data)
                .withMessage(error.message)
                .make();
    }
}

class ZodErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof ZodError;
    }

    protected getResponse(jsonResponse: JsonResponse, error: ZodError): Response {
        return jsonResponse.error(HttpStatusCode.BadRequest)
                .withMessage(error.issues[0].message)
                .make();
    }
}

class DrizzleErrorHandler extends ErrorHandler {
    protected canHandle(error: unknown): boolean {
        return error instanceof DrizzleError;
    }

    protected getResponse(jsonResponse: JsonResponse, error: DrizzleError): Response {
        return jsonResponse.error(HttpStatusCode.BadRequest)
                .withMessage(error.message)
                .make();
    }
}

export default (new HttpErrorHandler())
                .setNextHandler((new ZodErrorHandler())
                .setNextHandler(new DrizzleErrorHandler()))