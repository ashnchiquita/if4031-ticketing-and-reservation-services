import { sendUnaryData } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { ServerSurfaceCall } from "@grpc/grpc-js/build/src/server-call";
import bcrypt from 'bcrypt';
import env from "@/config/env";

export function authMiddleware<RequestType, ResponseType>(call: ServerSurfaceCall & {
    request: RequestType;
}, callback: sendUnaryData<ResponseType>, next: Function) {
    console.log('Intercepting request:', call.request);
    console.log('Intercepting metadata:', call.metadata);

    if (!call.request){
      console.log('No request');
      next(call, callback);
      return;
    }
    
    const apiKey: string = call.metadata.get('api-key')[0] as string;
    
    if (apiKey && isValidApiKey(apiKey)) {
      console.log('Valid API key');
        next(call, callback);
        return;
    } else {
      console.log('Invalid API key');
        callback({
            code: Status.UNAUTHENTICATED,
            details: 'Invalid API key',
        });
        return;
    }
}

function isValidApiKey(apiKey: string): boolean {
    const clientApiKey = env.CLIENT_API_KEY ?? "";
    console.log('Client API key:', clientApiKey, 'API key:', apiKey);
    return bcrypt.compareSync(apiKey, clientApiKey);
  }