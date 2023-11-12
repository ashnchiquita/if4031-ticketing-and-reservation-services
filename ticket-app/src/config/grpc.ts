import { BookingsService } from "@/proto/com/ticket_app/v1/bookings_grpc_pb";
import { EventsService } from "@/proto/com/ticket_app/v1/events_grpc_pb";
import { SeatsService } from "@/proto/com/ticket_app/v1/seats_grpc_pb";
import { BookingsServer } from "@/services/grpc/BookingsServer";
import { EventsServer } from "@/services/grpc/EventsServer";
import { SeatsServer } from "@/services/grpc/SeatsServer";
import { Server } from "@grpc/grpc-js";

const grpcServer = new Server();

// add services here
grpcServer.addService(EventsService, new EventsServer());
grpcServer.addService(SeatsService, new SeatsServer());
grpcServer.addService(BookingsService, new BookingsServer());

export {
    grpcServer
}