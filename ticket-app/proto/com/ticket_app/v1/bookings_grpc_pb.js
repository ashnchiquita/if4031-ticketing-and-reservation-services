// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_ticket_app_v1_bookings_pb = require('../../../com/ticket_app/v1/bookings_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_com_ticket_app_v1_BookingCancelRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingCancelRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingCancelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingCancelRequest(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingCancelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_BookingCreateRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingCreateRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingCreateRequest(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_BookingRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingRequest(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_BookingResponse(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingResponse)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingResponse(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_BookingUpdateRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingUpdateRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingUpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingUpdateRequest(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingUpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_BookingsRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_bookings_pb.BookingsRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.BookingsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_BookingsRequest(buffer_arg) {
  return com_ticket_app_v1_bookings_pb.BookingsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var BookingsService = exports.BookingsService = {
  getBooking: {
    path: '/com.ticket_app.v1.Bookings/GetBooking',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_bookings_pb.BookingRequest,
    responseType: com_ticket_app_v1_bookings_pb.BookingResponse,
    requestSerialize: serialize_com_ticket_app_v1_BookingRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_BookingRequest,
    responseSerialize: serialize_com_ticket_app_v1_BookingResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_BookingResponse,
  },
  getBookings: {
    path: '/com.ticket_app.v1.Bookings/GetBookings',
    requestStream: false,
    responseStream: true,
    requestType: com_ticket_app_v1_bookings_pb.BookingsRequest,
    responseType: com_ticket_app_v1_bookings_pb.BookingResponse,
    requestSerialize: serialize_com_ticket_app_v1_BookingsRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_BookingsRequest,
    responseSerialize: serialize_com_ticket_app_v1_BookingResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_BookingResponse,
  },
  createBooking: {
    path: '/com.ticket_app.v1.Bookings/CreateBooking',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_bookings_pb.BookingCreateRequest,
    responseType: com_ticket_app_v1_bookings_pb.BookingResponse,
    requestSerialize: serialize_com_ticket_app_v1_BookingCreateRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_BookingCreateRequest,
    responseSerialize: serialize_com_ticket_app_v1_BookingResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_BookingResponse,
  },
  updateBooking: {
    path: '/com.ticket_app.v1.Bookings/UpdateBooking',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_bookings_pb.BookingUpdateRequest,
    responseType: com_ticket_app_v1_bookings_pb.BookingResponse,
    requestSerialize: serialize_com_ticket_app_v1_BookingUpdateRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_BookingUpdateRequest,
    responseSerialize: serialize_com_ticket_app_v1_BookingResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_BookingResponse,
  },
  cancelBooking: {
    path: '/com.ticket_app.v1.Bookings/CancelBooking',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_bookings_pb.BookingCancelRequest,
    responseType: com_ticket_app_v1_bookings_pb.BookingResponse,
    requestSerialize: serialize_com_ticket_app_v1_BookingCancelRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_BookingCancelRequest,
    responseSerialize: serialize_com_ticket_app_v1_BookingResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_BookingResponse,
  },
};

exports.BookingsClient = grpc.makeGenericClientConstructor(BookingsService);
