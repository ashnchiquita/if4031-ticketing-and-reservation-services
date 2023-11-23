import db from "@/database/drizzle";
import { seats } from "@/models";
import { ISeatsServer } from "@/proto/com/ticket_app/v1/seats_grpc_pb";
import { SeatRequest, SeatResponse, CreateSeatRequest, UpdateSeatRequest, DeleteSeatRequest } from "@/proto/com/ticket_app/v1/seats_pb";
import {  mapSeatStatusToString, mapStringToSeatStatus } from "@/utils";
import { ServerUnaryCall, ServerWritableStream, ServiceError, UntypedHandleCall, sendUnaryData } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { eq } from "drizzle-orm";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export class SeatsServer implements ISeatsServer {
    [name: string]: UntypedHandleCall;
    async getSeat(call: ServerUnaryCall<SeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>) {
        const seatId = call.request.getId();
        try {
            const seat = await db.query.seats.findFirst({
                where: eq(seats.id, seatId),
                with: {
                    event: {
                        columns: {
                            updated_at: false,
                            created_at: false,
                            title: false,
                        }
                    }
                }
            })
            if (!seat) {
                const error: ServiceError = {
                    code: Status.NOT_FOUND,
                    details: `Seat with ID ${seatId} does not exist.`,
                    metadata: call.metadata,
                    message: `Seat with ID ${seatId} does not exist.`,
                    name: "Seat Missing",
                };
                return callback(error, null);
            }

            const seatResponse = new SeatResponse();
            seatResponse.setId(seat.id);
            seatResponse.setNumber(seat.number);
            seatResponse.setStatus(mapStringToSeatStatus(seat.status));
            seatResponse.setEventId(seat.event_id);

            console.log(`getSeat: returning seat ${seatId} (event ${seat.event_id}, status ${seat.status}, number ${seat.number})`);
            return callback(null, seatResponse);
        } catch (err) {
            console.error(err);
            const error: ServiceError = {
                code: Status.INTERNAL,
                details: `Internal server error.`,
                name: "Internal Server Error",
                message: `Internal server error.`,
                metadata: call.metadata,
              };
            return callback(error, null);
        }
    }
    async getSeats(call: ServerWritableStream<Empty, SeatResponse>) {
        try {
            console.log(`getSeats: streaming all seats.`);
            const seats = await db.query.seats.findMany({
                with: {
                    event: {
                        columns: {
                            updated_at: false,
                            created_at: false,
                            title: false,
                        }
                    }
                }
            })

            seats.forEach((seat) => {
                const seatResponse = new SeatResponse();
                seatResponse.setId(seat.id);
                seatResponse.setNumber(seat.number);
                seatResponse.setStatus(mapStringToSeatStatus(seat.status));
                seatResponse.setEventId(seat.event_id);
                call.write(seatResponse);
            })

            call.end();
        } catch (err) {
            console.error(err);
            const error: ServiceError = {
                code: Status.INTERNAL,
                details: `Internal server error.`,
                name: "Internal Server Error",
                message: `Internal server error.`,
                metadata: call.metadata,
              };
            call.emit("error", error);
        }
    }
    async createSeat(call: ServerUnaryCall<CreateSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>) {
        try {
            const seatNumber = call.request.getNumber();
            const eventId = call.request.getEventId();

            const res = await db.insert(seats).values({
                number: seatNumber,
                status: "available",
                event_id: eventId,
            }).returning({
                id: seats.id,
                number: seats.number,
                status: seats.status,
                event_id: seats.event_id,
            })
            
            const seat = res[0];
            console.log(`createSeat: created seat ${seat.id} (event ${seat.event_id}, status ${seat.status}, number ${seat.number})`);

            const seatResponse = new SeatResponse();
            seatResponse.setId(seat.id);
            seatResponse.setNumber(seat.number);
            seatResponse.setStatus(mapStringToSeatStatus(seat.status));
            seatResponse.setEventId(seat.event_id);

            callback(null, seatResponse);
        } catch (err) {
            console.error(err);
            const error: ServiceError = {
                code: Status.INTERNAL,
                details: `Internal server error.`,
                name: "Internal Server Error",
                message: `Internal server error.`,
                metadata: call.metadata,
              };
            callback(error, null);
        }
    }
    async updateSeat(call: ServerUnaryCall<UpdateSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): Promise<void> {
        try {
            console.log(`updateSeat: updating seat ${call.request.getId()}.`);
            const seatId = call.request.getId();
            const seatNumber = call.request.getNumber();
            const seatStatus = call.request.getStatus();
            const eventId = call.request.getEventId();

            const res = await db.update(seats).set({
                number: seatNumber,
                status: mapSeatStatusToString(seatStatus),
                event_id: eventId,
            }).where(eq(seats.id, seatId)).returning({
                id: seats.id,
                number: seats.number,
                status: seats.status,
                event_id: seats.event_id,
            })

            if (!res[0]) {
                const error: ServiceError = {
                    code: Status.NOT_FOUND,
                    details: `Seat with ID ${seatId} does not exist.`,
                    metadata: call.metadata,
                    message: `Seat with ID ${seatId} does not exist.`,
                    name: "Seat Missing",
                };
                return callback(error, null);
            }

            const updatedSeat = res[0];
            const seatResponse = new SeatResponse();
            seatResponse.setId(updatedSeat.id);
            seatResponse.setNumber(updatedSeat.number);
            seatResponse.setStatus(mapStringToSeatStatus(updatedSeat.status));
            seatResponse.setEventId(updatedSeat.event_id);

            console.log(`updateSeat: returning seat ${updatedSeat.id} (event ${updatedSeat.event_id}, status ${updatedSeat.status}, number ${updatedSeat.number})`);
            return callback(null, seatResponse);
        } catch (err) {
            console.error(err);
            const error: ServiceError = {
                code: Status.INTERNAL,
                details: `Internal server error.`,
                name: "Internal Server Error",
                message: `Internal server error.`,
                metadata: call.metadata,
              };
            callback(error, null);
        }
    }
    async deleteSeat(call: ServerUnaryCall<DeleteSeatRequest, SeatResponse>, callback: sendUnaryData<SeatResponse>): Promise<void> {
        try {
            console.log(`deleteSeat: deleting seat ${call.request.getId()}.`);
            const seatId = call.request.getId();

            const res = await db.delete(seats).where(eq(seats.id, seatId)).returning({
                id: seats.id,
                number: seats.number,
                status: seats.status,
                event_id: seats.event_id,
            })

            if (!res[0]) {
                const error: ServiceError = {
                    code: Status.NOT_FOUND,
                    details: `Seat with ID ${seatId} does not exist.`,
                    metadata: call.metadata,
                    message: `Seat with ID ${seatId} does not exist.`,
                    name: "Seat Missing",
                };
                return callback(error, null);
            }

            console.log(`deleteSeat: deleted seat ${res[0].id} (event ${res[0].event_id}, status ${res[0].status}, number ${res[0].number})`);
            const seatResponse = new SeatResponse();
            seatResponse.setId(res[0].id);
            seatResponse.setNumber(res[0].number);
            seatResponse.setStatus(mapStringToSeatStatus(res[0].status));
            seatResponse.setEventId(res[0].event_id);

            callback(null, seatResponse);
        } catch (err) {
            console.error(err);
            const error: ServiceError = {
                code: Status.INTERNAL,
                details: `Internal server error.`,
                name: "Internal Server Error",
                message: `Internal server error.`,
                metadata: call.metadata,
              };
            callback(error, null);
        }
    }
}
