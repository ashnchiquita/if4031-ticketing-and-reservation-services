// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_ticket_app_v1_seats_pb = require('../../../com/ticket_app/v1/seats_pb.js');

function serialize_com_ticket_app_v1_CreateSeatRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.CreateSeatRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.CreateSeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_CreateSeatRequest(buffer_arg) {
  return com_ticket_app_v1_seats_pb.CreateSeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_DeleteSeatRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.DeleteSeatRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.DeleteSeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_DeleteSeatRequest(buffer_arg) {
  return com_ticket_app_v1_seats_pb.DeleteSeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_SeatRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.SeatRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.SeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_SeatRequest(buffer_arg) {
  return com_ticket_app_v1_seats_pb.SeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_SeatResponse(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.SeatResponse)) {
    throw new Error('Expected argument of type com.ticket_app.v1.SeatResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_SeatResponse(buffer_arg) {
  return com_ticket_app_v1_seats_pb.SeatResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_SeatsRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.SeatsRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.SeatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_SeatsRequest(buffer_arg) {
  return com_ticket_app_v1_seats_pb.SeatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_UpdateSeatRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_seats_pb.UpdateSeatRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.UpdateSeatRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_UpdateSeatRequest(buffer_arg) {
  return com_ticket_app_v1_seats_pb.UpdateSeatRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SeatsService = exports.SeatsService = {
  getSeat: {
    path: '/com.ticket_app.v1.Seats/GetSeat',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_seats_pb.SeatRequest,
    responseType: com_ticket_app_v1_seats_pb.SeatResponse,
    requestSerialize: serialize_com_ticket_app_v1_SeatRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_SeatRequest,
    responseSerialize: serialize_com_ticket_app_v1_SeatResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_SeatResponse,
  },
  getSeats: {
    path: '/com.ticket_app.v1.Seats/GetSeats',
    requestStream: false,
    responseStream: true,
    requestType: com_ticket_app_v1_seats_pb.SeatsRequest,
    responseType: com_ticket_app_v1_seats_pb.SeatResponse,
    requestSerialize: serialize_com_ticket_app_v1_SeatsRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_SeatsRequest,
    responseSerialize: serialize_com_ticket_app_v1_SeatResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_SeatResponse,
  },
  createSeat: {
    path: '/com.ticket_app.v1.Seats/CreateSeat',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_seats_pb.CreateSeatRequest,
    responseType: com_ticket_app_v1_seats_pb.SeatResponse,
    requestSerialize: serialize_com_ticket_app_v1_CreateSeatRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_CreateSeatRequest,
    responseSerialize: serialize_com_ticket_app_v1_SeatResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_SeatResponse,
  },
  updateSeat: {
    path: '/com.ticket_app.v1.Seats/UpdateSeat',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_seats_pb.UpdateSeatRequest,
    responseType: com_ticket_app_v1_seats_pb.SeatResponse,
    requestSerialize: serialize_com_ticket_app_v1_UpdateSeatRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_UpdateSeatRequest,
    responseSerialize: serialize_com_ticket_app_v1_SeatResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_SeatResponse,
  },
  deleteSeat: {
    path: '/com.ticket_app.v1.Seats/DeleteSeat',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_seats_pb.DeleteSeatRequest,
    responseType: com_ticket_app_v1_seats_pb.SeatResponse,
    requestSerialize: serialize_com_ticket_app_v1_DeleteSeatRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_DeleteSeatRequest,
    responseSerialize: serialize_com_ticket_app_v1_SeatResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_SeatResponse,
  },
};

exports.SeatsClient = grpc.makeGenericClientConstructor(SeatsService);
