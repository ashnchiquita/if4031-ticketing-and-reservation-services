import { IBookingsServer } from "@/proto/com/ticket_app/v1/bookings_grpc_pb";
import { BookingRequest, BookingResponse, BookingsRequest, BookingCreateRequest, BookingUpdateRequest, BookingCancelRequest } from "@/proto/com/ticket_app/v1/bookings_pb";
import { ServerUnaryCall, ServerWritableStream, UntypedHandleCall, handleServerStreamingCall, handleUnaryCall, sendUnaryData } from "@grpc/grpc-js";

export class BookingsServer implements IBookingsServer {
    [name: string]: UntypedHandleCall;
    getBooking(call: ServerUnaryCall<BookingRequest, BookingResponse>, callback: sendUnaryData<BookingResponse>): void {
        throw new Error("Method not implemented.");
    }
    getBookings(call: ServerWritableStream<BookingsRequest, BookingResponse>): void {
        throw new Error("Method not implemented.");
    }
    createBooking(call: ServerUnaryCall<BookingCreateRequest, BookingResponse>, callback: sendUnaryData<BookingResponse>): void {
        throw new Error("Method not implemented.");
    }
    updateBooking(call: ServerUnaryCall<BookingUpdateRequest, BookingResponse>, callback: sendUnaryData<BookingResponse>): void {
        throw new Error("Method not implemented.");
    }
    cancelBooking(call: ServerUnaryCall<BookingCancelRequest, BookingResponse>, callback: sendUnaryData<BookingResponse>): void {
        throw new Error("Method not implemented.");
    }

}