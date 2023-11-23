// package: com.ticket_app.v1
// file: com/ticket_app/v1/seats.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_ticket_app_v1_seats_pb from "../../../com/ticket_app/v1/seats_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface ISeatsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSeat: ISeatsService_IGetSeat;
    getSeats: ISeatsService_IGetSeats;
    createSeat: ISeatsService_ICreateSeat;
    updateSeat: ISeatsService_IUpdateSeat;
    deleteSeat: ISeatsService_IDeleteSeat;
}

interface ISeatsService_IGetSeat extends grpc.MethodDefinition<com_ticket_app_v1_seats_pb.SeatRequest, com_ticket_app_v1_seats_pb.SeatResponse> {
    path: "/com.ticket_app.v1.Seats/GetSeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatResponse>;
}
interface ISeatsService_IGetSeats extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, com_ticket_app_v1_seats_pb.SeatResponse> {
    path: "/com.ticket_app.v1.Seats/GetSeats";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatResponse>;
}
interface ISeatsService_ICreateSeat extends grpc.MethodDefinition<com_ticket_app_v1_seats_pb.CreateSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse> {
    path: "/com.ticket_app.v1.Seats/CreateSeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.CreateSeatRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.CreateSeatRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatResponse>;
}
interface ISeatsService_IUpdateSeat extends grpc.MethodDefinition<com_ticket_app_v1_seats_pb.UpdateSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse> {
    path: "/com.ticket_app.v1.Seats/UpdateSeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.UpdateSeatRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.UpdateSeatRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatResponse>;
}
interface ISeatsService_IDeleteSeat extends grpc.MethodDefinition<com_ticket_app_v1_seats_pb.DeleteSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse> {
    path: "/com.ticket_app.v1.Seats/DeleteSeat";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.DeleteSeatRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.DeleteSeatRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_seats_pb.SeatResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_seats_pb.SeatResponse>;
}

export const SeatsService: ISeatsService;

export interface ISeatsServer extends grpc.UntypedServiceImplementation {
    getSeat: grpc.handleUnaryCall<com_ticket_app_v1_seats_pb.SeatRequest, com_ticket_app_v1_seats_pb.SeatResponse>;
    getSeats: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, com_ticket_app_v1_seats_pb.SeatResponse>;
    createSeat: grpc.handleUnaryCall<com_ticket_app_v1_seats_pb.CreateSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse>;
    updateSeat: grpc.handleUnaryCall<com_ticket_app_v1_seats_pb.UpdateSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse>;
    deleteSeat: grpc.handleUnaryCall<com_ticket_app_v1_seats_pb.DeleteSeatRequest, com_ticket_app_v1_seats_pb.SeatResponse>;
}

export interface ISeatsClient {
    getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    getSeats(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_seats_pb.SeatResponse>;
    getSeats(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_seats_pb.SeatResponse>;
    createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
}

export class SeatsClient extends grpc.Client implements ISeatsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public getSeat(request: com_ticket_app_v1_seats_pb.SeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public getSeats(request: google_protobuf_empty_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_seats_pb.SeatResponse>;
    public getSeats(request: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_seats_pb.SeatResponse>;
    public createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public createSeat(request: com_ticket_app_v1_seats_pb.CreateSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public updateSeat(request: com_ticket_app_v1_seats_pb.UpdateSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
    public deleteSeat(request: com_ticket_app_v1_seats_pb.DeleteSeatRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_seats_pb.SeatResponse) => void): grpc.ClientUnaryCall;
}
