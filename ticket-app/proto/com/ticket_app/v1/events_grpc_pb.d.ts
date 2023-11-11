// package: com.ticket_app.v1
// file: com/ticket_app/v1/events.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as com_ticket_app_v1_events_pb from "../../../com/ticket_app/v1/events_pb";
import * as com_ticket_app_v1_seats_pb from "../../../com/ticket_app/v1/seats_pb";

interface IEventsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getEvent: IEventsService_IGetEvent;
    getEvents: IEventsService_IGetEvents;
    createEvent: IEventsService_ICreateEvent;
    updateEvent: IEventsService_IUpdateEvent;
    deleteEvent: IEventsService_IDeleteEvent;
}

interface IEventsService_IGetEvent extends grpc.MethodDefinition<com_ticket_app_v1_events_pb.EventRequest, com_ticket_app_v1_events_pb.EventResponse> {
    path: "/com.ticket_app.v1.Events/GetEvent";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_events_pb.EventRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.EventRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_events_pb.EventResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.EventResponse>;
}
interface IEventsService_IGetEvents extends grpc.MethodDefinition<com_ticket_app_v1_events_pb.EventsRequest, com_ticket_app_v1_events_pb.EventResponse> {
    path: "/com.ticket_app.v1.Events/GetEvents";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<com_ticket_app_v1_events_pb.EventsRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.EventsRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_events_pb.EventResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.EventResponse>;
}
interface IEventsService_ICreateEvent extends grpc.MethodDefinition<com_ticket_app_v1_events_pb.CreateEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse> {
    path: "/com.ticket_app.v1.Events/CreateEvent";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_events_pb.CreateEventRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.CreateEventRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
}
interface IEventsService_IUpdateEvent extends grpc.MethodDefinition<com_ticket_app_v1_events_pb.UpdateEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse> {
    path: "/com.ticket_app.v1.Events/UpdateEvent";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_events_pb.UpdateEventRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.UpdateEventRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
}
interface IEventsService_IDeleteEvent extends grpc.MethodDefinition<com_ticket_app_v1_events_pb.DeleteEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse> {
    path: "/com.ticket_app.v1.Events/DeleteEvent";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<com_ticket_app_v1_events_pb.DeleteEventRequest>;
    requestDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.DeleteEventRequest>;
    responseSerialize: grpc.serialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
    responseDeserialize: grpc.deserialize<com_ticket_app_v1_events_pb.ModifyEventResponse>;
}

export const EventsService: IEventsService;

export interface IEventsServer extends grpc.UntypedServiceImplementation {
    getEvent: grpc.handleUnaryCall<com_ticket_app_v1_events_pb.EventRequest, com_ticket_app_v1_events_pb.EventResponse>;
    getEvents: grpc.handleServerStreamingCall<com_ticket_app_v1_events_pb.EventsRequest, com_ticket_app_v1_events_pb.EventResponse>;
    createEvent: grpc.handleUnaryCall<com_ticket_app_v1_events_pb.CreateEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse>;
    updateEvent: grpc.handleUnaryCall<com_ticket_app_v1_events_pb.UpdateEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse>;
    deleteEvent: grpc.handleUnaryCall<com_ticket_app_v1_events_pb.DeleteEventRequest, com_ticket_app_v1_events_pb.ModifyEventResponse>;
}

export interface IEventsClient {
    getEvent(request: com_ticket_app_v1_events_pb.EventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    getEvent(request: com_ticket_app_v1_events_pb.EventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    getEvent(request: com_ticket_app_v1_events_pb.EventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    getEvents(request: com_ticket_app_v1_events_pb.EventsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_events_pb.EventResponse>;
    getEvents(request: com_ticket_app_v1_events_pb.EventsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_events_pb.EventResponse>;
    createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
}

export class EventsClient extends grpc.Client implements IEventsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getEvent(request: com_ticket_app_v1_events_pb.EventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    public getEvent(request: com_ticket_app_v1_events_pb.EventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    public getEvent(request: com_ticket_app_v1_events_pb.EventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.EventResponse) => void): grpc.ClientUnaryCall;
    public getEvents(request: com_ticket_app_v1_events_pb.EventsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_events_pb.EventResponse>;
    public getEvents(request: com_ticket_app_v1_events_pb.EventsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<com_ticket_app_v1_events_pb.EventResponse>;
    public createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public createEvent(request: com_ticket_app_v1_events_pb.CreateEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public updateEvent(request: com_ticket_app_v1_events_pb.UpdateEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
    public deleteEvent(request: com_ticket_app_v1_events_pb.DeleteEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: com_ticket_app_v1_events_pb.ModifyEventResponse) => void): grpc.ClientUnaryCall;
}
