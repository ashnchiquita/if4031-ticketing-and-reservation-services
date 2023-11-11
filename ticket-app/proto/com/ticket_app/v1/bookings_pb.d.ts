// package: com.ticket_app.v1
// file: com/ticket_app/v1/bookings.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Booking extends jspb.Message { 
    getId(): string;
    setId(value: string): Booking;
    getSeatId(): string;
    setSeatId(value: string): Booking;
    getUserId(): string;
    setUserId(value: string): Booking;
    getStatus(): BookingStatus;
    setStatus(value: BookingStatus): Booking;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Booking;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Booking;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Booking.AsObject;
    static toObject(includeInstance: boolean, msg: Booking): Booking.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Booking, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Booking;
    static deserializeBinaryFromReader(message: Booking, reader: jspb.BinaryReader): Booking;
}

export namespace Booking {
    export type AsObject = {
        id: string,
        seatId: string,
        userId: string,
        status: BookingStatus,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class BookingRequest extends jspb.Message { 
    getSeatId(): string;
    setSeatId(value: string): BookingRequest;
    getUserId(): string;
    setUserId(value: string): BookingRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingRequest): BookingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingRequest;
    static deserializeBinaryFromReader(message: BookingRequest, reader: jspb.BinaryReader): BookingRequest;
}

export namespace BookingRequest {
    export type AsObject = {
        seatId: string,
        userId: string,
    }
}

export class BookingResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): BookingResponse;
    getSeatId(): string;
    setSeatId(value: string): BookingResponse;
    getUserId(): string;
    setUserId(value: string): BookingResponse;
    getStatus(): BookingStatus;
    setStatus(value: BookingStatus): BookingResponse;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): BookingResponse;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): BookingResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BookingResponse): BookingResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingResponse;
    static deserializeBinaryFromReader(message: BookingResponse, reader: jspb.BinaryReader): BookingResponse;
}

export namespace BookingResponse {
    export type AsObject = {
        id: string,
        seatId: string,
        userId: string,
        status: BookingStatus,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class BookingsRequest extends jspb.Message { 

    hasSeatId(): boolean;
    clearSeatId(): void;
    getSeatId(): string | undefined;
    setSeatId(value: string): BookingsRequest;

    hasUserId(): boolean;
    clearUserId(): void;
    getUserId(): string | undefined;
    setUserId(value: string): BookingsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingsRequest): BookingsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingsRequest;
    static deserializeBinaryFromReader(message: BookingsRequest, reader: jspb.BinaryReader): BookingsRequest;
}

export namespace BookingsRequest {
    export type AsObject = {
        seatId?: string,
        userId?: string,
    }
}

export class BookingCancelRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): BookingCancelRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingCancelRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingCancelRequest): BookingCancelRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingCancelRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingCancelRequest;
    static deserializeBinaryFromReader(message: BookingCancelRequest, reader: jspb.BinaryReader): BookingCancelRequest;
}

export namespace BookingCancelRequest {
    export type AsObject = {
        id: string,
    }
}

export class BookingConfirmRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): BookingConfirmRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingConfirmRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingConfirmRequest): BookingConfirmRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingConfirmRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingConfirmRequest;
    static deserializeBinaryFromReader(message: BookingConfirmRequest, reader: jspb.BinaryReader): BookingConfirmRequest;
}

export namespace BookingConfirmRequest {
    export type AsObject = {
        id: string,
    }
}

export class BookingCreateRequest extends jspb.Message { 
    getSeatId(): string;
    setSeatId(value: string): BookingCreateRequest;
    getUserId(): string;
    setUserId(value: string): BookingCreateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingCreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingCreateRequest): BookingCreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingCreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingCreateRequest;
    static deserializeBinaryFromReader(message: BookingCreateRequest, reader: jspb.BinaryReader): BookingCreateRequest;
}

export namespace BookingCreateRequest {
    export type AsObject = {
        seatId: string,
        userId: string,
    }
}

export class BookingUpdateRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): BookingUpdateRequest;
    getSeatId(): string;
    setSeatId(value: string): BookingUpdateRequest;
    getUserId(): string;
    setUserId(value: string): BookingUpdateRequest;
    getStatus(): BookingStatus;
    setStatus(value: BookingStatus): BookingUpdateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingUpdateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingUpdateRequest): BookingUpdateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingUpdateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingUpdateRequest;
    static deserializeBinaryFromReader(message: BookingUpdateRequest, reader: jspb.BinaryReader): BookingUpdateRequest;
}

export namespace BookingUpdateRequest {
    export type AsObject = {
        id: string,
        seatId: string,
        userId: string,
        status: BookingStatus,
    }
}

export enum BookingStatus {
    PENDING = 0,
    CONFIRMED = 1,
    CANCELLED = 2,
}
