// package: com.ticket_app.v1
// file: com/ticket_app/v1/seats.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Seat extends jspb.Message { 
    getId(): string;
    setId(value: string): Seat;
    getNumber(): number;
    setNumber(value: number): Seat;
    getStatus(): SeatStatus;
    setStatus(value: SeatStatus): Seat;
    getEventId(): string;
    setEventId(value: string): Seat;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Seat.AsObject;
    static toObject(includeInstance: boolean, msg: Seat): Seat.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Seat, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Seat;
    static deserializeBinaryFromReader(message: Seat, reader: jspb.BinaryReader): Seat;
}

export namespace Seat {
    export type AsObject = {
        id: string,
        number: number,
        status: SeatStatus,
        eventId: string,
    }
}

export class SeatRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): SeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SeatRequest): SeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SeatRequest;
    static deserializeBinaryFromReader(message: SeatRequest, reader: jspb.BinaryReader): SeatRequest;
}

export namespace SeatRequest {
    export type AsObject = {
        id: string,
    }
}

export class SeatResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): SeatResponse;
    getNumber(): number;
    setNumber(value: number): SeatResponse;
    getStatus(): SeatStatus;
    setStatus(value: SeatStatus): SeatResponse;
    getEventId(): string;
    setEventId(value: string): SeatResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SeatResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SeatResponse): SeatResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SeatResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SeatResponse;
    static deserializeBinaryFromReader(message: SeatResponse, reader: jspb.BinaryReader): SeatResponse;
}

export namespace SeatResponse {
    export type AsObject = {
        id: string,
        number: number,
        status: SeatStatus,
        eventId: string,
    }
}

export class CreateSeatRequest extends jspb.Message { 
    getNumber(): number;
    setNumber(value: number): CreateSeatRequest;
    getEventId(): string;
    setEventId(value: string): CreateSeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateSeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateSeatRequest): CreateSeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateSeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateSeatRequest;
    static deserializeBinaryFromReader(message: CreateSeatRequest, reader: jspb.BinaryReader): CreateSeatRequest;
}

export namespace CreateSeatRequest {
    export type AsObject = {
        number: number,
        eventId: string,
    }
}

export class UpdateSeatRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateSeatRequest;
    getNumber(): number;
    setNumber(value: number): UpdateSeatRequest;
    getStatus(): SeatStatus;
    setStatus(value: SeatStatus): UpdateSeatRequest;
    getEventId(): string;
    setEventId(value: string): UpdateSeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSeatRequest): UpdateSeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSeatRequest;
    static deserializeBinaryFromReader(message: UpdateSeatRequest, reader: jspb.BinaryReader): UpdateSeatRequest;
}

export namespace UpdateSeatRequest {
    export type AsObject = {
        id: string,
        number: number,
        status: SeatStatus,
        eventId: string,
    }
}

export class DeleteSeatRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteSeatRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteSeatRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteSeatRequest): DeleteSeatRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteSeatRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteSeatRequest;
    static deserializeBinaryFromReader(message: DeleteSeatRequest, reader: jspb.BinaryReader): DeleteSeatRequest;
}

export namespace DeleteSeatRequest {
    export type AsObject = {
        id: string,
    }
}

export enum SeatStatus {
    AVAILABLE = 0,
    BOOKED = 1,
    SOLD = 2,
}
