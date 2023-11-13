// package: com.ticket_app.v1
// file: com/ticket_app/v1/events.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as com_ticket_app_v1_seats_pb from "../../../com/ticket_app/v1/seats_pb";

export class Event extends jspb.Message { 
    getId(): string;
    setId(value: string): Event;
    getTitle(): string;
    setTitle(value: string): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        id: string,
        title: string,
    }
}

export class EventSeat extends jspb.Message { 
    getId(): string;
    setId(value: string): EventSeat;
    getNumber(): number;
    setNumber(value: number): EventSeat;
    getStatus(): com_ticket_app_v1_seats_pb.SeatStatus;
    setStatus(value: com_ticket_app_v1_seats_pb.SeatStatus): EventSeat;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventSeat.AsObject;
    static toObject(includeInstance: boolean, msg: EventSeat): EventSeat.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventSeat, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventSeat;
    static deserializeBinaryFromReader(message: EventSeat, reader: jspb.BinaryReader): EventSeat;
}

export namespace EventSeat {
    export type AsObject = {
        id: string,
        number: number,
        status: com_ticket_app_v1_seats_pb.SeatStatus,
    }
}

export class EventRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): EventRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EventRequest): EventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventRequest;
    static deserializeBinaryFromReader(message: EventRequest, reader: jspb.BinaryReader): EventRequest;
}

export namespace EventRequest {
    export type AsObject = {
        id: string,
    }
}

export class EventsRequest extends jspb.Message { 

    hasTitle(): boolean;
    clearTitle(): void;
    getTitle(): string | undefined;
    setTitle(value: string): EventsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EventsRequest): EventsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventsRequest;
    static deserializeBinaryFromReader(message: EventsRequest, reader: jspb.BinaryReader): EventsRequest;
}

export namespace EventsRequest {
    export type AsObject = {
        title?: string,
    }
}

export class ModifyEventResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): ModifyEventResponse;
    getTitle(): string;
    setTitle(value: string): ModifyEventResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ModifyEventResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ModifyEventResponse): ModifyEventResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ModifyEventResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ModifyEventResponse;
    static deserializeBinaryFromReader(message: ModifyEventResponse, reader: jspb.BinaryReader): ModifyEventResponse;
}

export namespace ModifyEventResponse {
    export type AsObject = {
        id: string,
        title: string,
    }
}

export class GetEventResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): GetEventResponse;
    getTitle(): string;
    setTitle(value: string): GetEventResponse;
    clearSeatsList(): void;
    getSeatsList(): Array<EventSeat>;
    setSeatsList(value: Array<EventSeat>): GetEventResponse;
    addSeats(value?: EventSeat, index?: number): EventSeat;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventResponse): GetEventResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventResponse;
    static deserializeBinaryFromReader(message: GetEventResponse, reader: jspb.BinaryReader): GetEventResponse;
}

export namespace GetEventResponse {
    export type AsObject = {
        id: string,
        title: string,
        seatsList: Array<EventSeat.AsObject>,
    }
}

export class GetEventsResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): GetEventsResponse;
    getTitle(): string;
    setTitle(value: string): GetEventsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventsResponse): GetEventsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventsResponse;
    static deserializeBinaryFromReader(message: GetEventsResponse, reader: jspb.BinaryReader): GetEventsResponse;
}

export namespace GetEventsResponse {
    export type AsObject = {
        id: string,
        title: string,
    }
}

export class CreateEventRequest extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): CreateEventRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateEventRequest): CreateEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateEventRequest;
    static deserializeBinaryFromReader(message: CreateEventRequest, reader: jspb.BinaryReader): CreateEventRequest;
}

export namespace CreateEventRequest {
    export type AsObject = {
        title: string,
    }
}

export class UpdateEventRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateEventRequest;
    getTitle(): string;
    setTitle(value: string): UpdateEventRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateEventRequest): UpdateEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateEventRequest;
    static deserializeBinaryFromReader(message: UpdateEventRequest, reader: jspb.BinaryReader): UpdateEventRequest;
}

export namespace UpdateEventRequest {
    export type AsObject = {
        id: string,
        title: string,
    }
}

export class DeleteEventRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteEventRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteEventRequest): DeleteEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteEventRequest;
    static deserializeBinaryFromReader(message: DeleteEventRequest, reader: jspb.BinaryReader): DeleteEventRequest;
}

export namespace DeleteEventRequest {
    export type AsObject = {
        id: string,
    }
}
