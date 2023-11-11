import { ISeatsServer } from "@/proto/com/ticket_app/v1/seats_grpc_pb";
import { SeatRequest, SeatResponse, SeatsRequest, CreateSeatRequest, UpdateSeatRequest, DeleteSeatRequest } from "@/proto/com/ticket_app/v1/seats_pb";
import { ServerUnaryCall, ServerWritableStream, UntypedHandleCall, sendUnaryData } from "@grpc/grpc-js";

export class SeatsServer implements ISeatsServer {
    [name: string]: UntypedHandleCall;
    getSeat(call: ServerUnaryCall<SeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): void {
        throw new Error("Method not implemented.");
    }
    getSeats(call: ServerWritableStream<SeatsRequest, SeatResponse>): void {
        throw new Error("Method not implemented.");
    }
    createSeat(call: ServerUnaryCall<CreateSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): void {
        throw new Error("Method not implemented.");
    }
    updateSeat(call: ServerUnaryCall<UpdateSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): void {
        throw new Error("Method not implemented.");
    }
    deleteSeat(call: ServerUnaryCall<DeleteSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): void {
        throw new Error("Method not implemented.");
    }
}
