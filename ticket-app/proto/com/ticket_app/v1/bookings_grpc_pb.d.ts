// package: com.ticket_app.v1
// file: com/ticket_app/v1/bookings.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_ticket_app_v1_bookings_pb from "../../../com/ticket_app/v1/bookings_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IBookingsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBooking: IBookingsService_IGetBooking;
    getBookings: IBookingsService_IGetBookings;
    createBooking: IBookingsService_ICreateBooking;
    updateBooking: IBookingsService_IUpdateBooking;
    cancelBooking: IBookingsService_ICancelBooking;
}

interface IBookingsService_IGetBooking extends grpc.MethodDefinition<com_ticket_app_v1_bookings_pb.BookingRequest, com_ticket_app_v1_bookings_pb.BookingResponse> {
    path: "/com.ticket_app.v1.Bookings/GetBooking";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
}
interface IBookingsService_IGetBookings extends grpc.MethodDefinition<com_ticket_app_v1_bookings_pb.BookingsRequest, com_ticket_app_v1_bookings_pb.BookingResponse> {
    path: "/com.ticket_app.v1.Bookings/GetBookings";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingsRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingsRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
}
interface IBookingsService_ICreateBooking extends grpc.MethodDefinition<com_ticket_app_v1_bookings_pb.BookingCreateRequest, com_ticket_app_v1_bookings_pb.BookingResponse> {
    path: "/com.ticket_app.v1.Bookings/CreateBooking";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingCreateRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingCreateRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
}
interface IBookingsService_IUpdateBooking extends grpc.MethodDefinition<com_ticket_app_v1_bookings_pb.BookingUpdateRequest, com_ticket_app_v1_bookings_pb.BookingResponse> {
    path: "/com.ticket_app.v1.Bookings/UpdateBooking";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingUpdateRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingUpdateRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
}
interface IBookingsService_ICancelBooking extends grpc.MethodDefinition<com_ticket_app_v1_bookings_pb.BookingCancelRequest, com_ticket_app_v1_bookings_pb.BookingResponse> {
    path: "/com.ticket_app.v1.Bookings/CancelBooking";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingCancelRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingCancelRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_bookings_pb.BookingResponse>;
}

export const BookingsService: IBookingsService;

export interface IBookingsServer extends grpc.UntypedServiceImplementation {
    getBooking: grpc.handleUnaryCall<com_ticket_app_v1_bookings_pb.BookingRequest, com_ticket_app_v1_bookings_pb.BookingResponse>;
    getBookings: grpc.handleServerStreamingCall<com_ticket_app_v1_bookings_pb.BookingsRequest, com_ticket_app_v1_bookings_pb.BookingResponse>;
    createBooking: grpc.handleUnaryCall<com_ticket_app_v1_bookings_pb.BookingCreateRequest, com_ticket_app_v1_bookings_pb.BookingResponse>;
    updateBooking: grpc.handleUnaryCall<com_ticket_app_v1_bookings_pb.BookingUpdateRequest, com_ticket_app_v1_bookings_pb.BookingResponse>;
    cancelBooking: grpc.handleUnaryCall<com_ticket_app_v1_bookings_pb.BookingCancelRequest, com_ticket_app_v1_bookings_pb.BookingResponse>;
}

export interface IBookingsClient {
    getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    getBookings(request: com_ticket_app_v1_bookings_pb.BookingsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_bookings_pb.BookingResponse>;
    getBookings(request: com_ticket_app_v1_bookings_pb.BookingsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_bookings_pb.BookingResponse>;
    createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
}

export class BookingsClient extends grpc.Client implements IBookingsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public getBooking(request: com_ticket_app_v1_bookings_pb.BookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public getBookings(request: com_ticket_app_v1_bookings_pb.BookingsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_bookings_pb.BookingResponse>;
    public getBookings(request: com_ticket_app_v1_bookings_pb.BookingsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_bookings_pb.BookingResponse>;
    public createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public createBooking(request: com_ticket_app_v1_bookings_pb.BookingCreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public updateBooking(request: com_ticket_app_v1_bookings_pb.BookingUpdateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: com_ticket_app_v1_bookings_pb.BookingCancelRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_bookings_pb.BookingResponse) => void): grpc.ClientUnaryCall;
}
