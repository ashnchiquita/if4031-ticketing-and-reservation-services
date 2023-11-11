import db from "@/database/drizzle";
import { events } from "@/models";
import { IEventsServer } from "@/proto/com/ticket_app/v1/events_grpc_pb";
import { CreateEventRequest, DeleteEventRequest, EventRequest, EventResponse, EventSeat, EventsRequest, ModifyEventResponse, UpdateEventRequest } from "@/proto/com/ticket_app/v1/events_pb";
import { authenticate, mapSeatStatus } from "@/utils";
import {  ServerUnaryCall, ServerWritableStream, ServiceError, UntypedHandleCall, handleUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { eq } from "drizzle-orm";

export class EventsServer implements IEventsServer {
  [name: string]: UntypedHandleCall;

  private createEventResponse(event: any) {
    const eventResponse = new EventResponse();
    eventResponse.setId(event.id);
    eventResponse.setTitle(event.title);
    if (!event.seats) {
      eventResponse.setSeatsList([]);
      return eventResponse;
    }
    eventResponse.setSeatsList(event.seats.map((seat: any) => {
      const eventSeat = new EventSeat();
      eventSeat.setId(seat.id);
      eventSeat.setNumber(seat.number);
      eventSeat.setStatus(mapSeatStatus(seat.status));
      return eventSeat;
    }))

    return eventResponse;
  }

  private createModifyEventResponse(event: any) {
    const eventResponse = new ModifyEventResponse();
    eventResponse.setId(event.id);
    eventResponse.setTitle(event.title);
    
    return eventResponse;
  }

    async getEvent(call: ServerUnaryCall<EventRequest, EventResponse>, callback: sendUnaryData<EventResponse>) {
      await authenticate(call,(data) => callback(data));
      try {
        const eventId = call.request.getId();
        const event = await db.query.events.findFirst({
          where: eq(events.id, eventId),
          with:{
            seats: {
              columns: {
                updated_at: false,
                created_at: false,
                event_id: false,
              }
            },
          }
        })
    
      if (!event) {
        const error: ServiceError = {
          code: Status.NOT_FOUND,
          details: `Event with ID ${eventId} does not exist.`,
          metadata: call.metadata,
          name: "Event Missing",
          message: `Event with ID ${eventId} does not exist.`,
        };
        callback(error, null);
        return;
      }
  
      console.log(`getEvent: returning ${event.title} (id: ${event.id}).`);
      callback(null, this.createEventResponse(event));
      } catch (err) {
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

    async getEvents(call: ServerWritableStream<EventsRequest, EventResponse>) {
        await authenticate(call, (data) => call.emit('error',data));
        try {

          console.log(`getEvents: streaming all events.`);
          const eventList = await db.query.events.findMany({
            with:{
              seats: {
                columns: {
                  updated_at: false,
                  created_at: false,
                  event_id: false,
                }
              },
            }
          })
  
          if (eventList) {
            eventList.forEach((event) => {
              call.write(this.createEventResponse(event));
            })
          }
  
          call.end();
        } catch (err) {
          const error: ServiceError = {
            code: Status.INTERNAL,
            details: `Internal server error.`,
            name: "Internal Server Error",
            message: `Internal server error.`,
            metadata: call.metadata,
          };
          call.emit('error',error)
        }
    }

    async createEvent(call: ServerUnaryCall<CreateEventRequest, ModifyEventResponse>, callback: sendUnaryData<ModifyEventResponse>) {
      await authenticate(call,(data) => callback(data));
      try {

        const res = await db.insert(events).values({
          title: call.request.getTitle(),
        }).returning({
          id: events.id,
          title: events.title,
        })
  
        const event = res[0];
        callback(null, this.createModifyEventResponse(event));
      } catch(err) {
        console.log(err);
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

    async updateEvent(call: ServerUnaryCall<UpdateEventRequest, ModifyEventResponse>, callback: sendUnaryData<ModifyEventResponse>) {
      await authenticate(call,(data) => callback(data));

      try {

        const eventId = call.request.getId();
        const event = await db.query.events.findFirst({
          where: eq(events.id, eventId),
        })
  
        if (!event) {
          const error: ServiceError = {
            code: Status.NOT_FOUND,
            details: `Event with ID ${eventId} does not exist.`,
            metadata: call.metadata,
            name: "Event Missing",
            message: `Event with ID ${eventId} does not exist.`,
          };
          callback(error, null);
          return;
        }
  
        const res = await db.update(events).set({
          title: call.request.getTitle(),
        }).where(eq(events.id, eventId)).returning({
          id: events.id,
          title: events.title,
        })
  
        const updatedEvent = res[0];
        callback(null, this.createModifyEventResponse(updatedEvent));
      } catch (err) {
        console.log(err);
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

    async deleteEvent(call: ServerUnaryCall<DeleteEventRequest, ModifyEventResponse>, callback: sendUnaryData<ModifyEventResponse>) {
      await authenticate(call,(data) => callback(data));

      try {
        const eventId = call.request.getId();
        const event = await db.query.events.findFirst({
          where: eq(events.id, eventId),
        })
  
        if (!event) {
          const error: ServiceError = {
            code: Status.NOT_FOUND,
            details: `Event with ID ${eventId} does not exist.`,
            metadata: call.metadata,
            name: "Event Missing",
            message: `Event with ID ${eventId} does not exist.`,
          };
          callback(error, null);
          return;
        }
  
        await db.delete(events).where(eq(events.id, eventId)).returning({ id: events.id, title: events.title });
        callback(null, this.createModifyEventResponse(event));
      } catch(err) {
        console.log(err);
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