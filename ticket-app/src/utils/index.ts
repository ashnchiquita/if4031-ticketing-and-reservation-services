import { SeatStatus } from "@/proto/com/ticket_app/v1/seats_pb";
import tryCatchWrapper from "./tryCatchWrapper"
import validate from "./validate"
import JsonResponse from "./JsonResponse"
import errorHandlerChain from './ErrorHandler';
import HttpError from "./HttpError";

export function mapStringToSeatStatus(status: 'available' | 'booked' | 'sold'): SeatStatus {
   const statusMap = {
            available: SeatStatus.AVAILABLE,
            booked: SeatStatus.BOOKED,
            sold: SeatStatus.SOLD,
    }
    
    const seatStatus = statusMap[status] as SeatStatus;
    if (!seatStatus) {
        throw new Error(`Invalid seat status: ${status}`);
    }

    return seatStatus;
}

export function mapSeatStatusToString(status: SeatStatus): 'available' | 'booked' | 'sold' {
   const statusMap = {
         [SeatStatus.AVAILABLE]: 'available',
         [SeatStatus.BOOKED]: 'booked',
         [SeatStatus.SOLD]: 'sold',
   }

    const stringStatus =  statusMap[status] as 'available' | 'booked' | 'sold';
    if (!stringStatus) {
        throw new Error(`Invalid seat status: ${status}`);
    }

    return stringStatus;
}

export {
    tryCatchWrapper,
    validate,
    JsonResponse,
    errorHandlerChain,
    HttpError
}