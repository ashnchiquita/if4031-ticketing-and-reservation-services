// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var com_ticket_app_v1_events_pb = require('../../../com/ticket_app/v1/events_pb.js');
var com_ticket_app_v1_seats_pb = require('../../../com/ticket_app/v1/seats_pb.js');

function serialize_com_ticket_app_v1_CreateEventRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.CreateEventRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.CreateEventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_CreateEventRequest(buffer_arg) {
  return com_ticket_app_v1_events_pb.CreateEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_DeleteEventRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.DeleteEventRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.DeleteEventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_DeleteEventRequest(buffer_arg) {
  return com_ticket_app_v1_events_pb.DeleteEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_EventRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.EventRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.EventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_EventRequest(buffer_arg) {
  return com_ticket_app_v1_events_pb.EventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_EventsRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.EventsRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.EventsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_EventsRequest(buffer_arg) {
  return com_ticket_app_v1_events_pb.EventsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_GetEventResponse(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.GetEventResponse)) {
    throw new Error('Expected argument of type com.ticket_app.v1.GetEventResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_GetEventResponse(buffer_arg) {
  return com_ticket_app_v1_events_pb.GetEventResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_GetEventsResponse(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.GetEventsResponse)) {
    throw new Error('Expected argument of type com.ticket_app.v1.GetEventsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_GetEventsResponse(buffer_arg) {
  return com_ticket_app_v1_events_pb.GetEventsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_ModifyEventResponse(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.ModifyEventResponse)) {
    throw new Error('Expected argument of type com.ticket_app.v1.ModifyEventResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_ModifyEventResponse(buffer_arg) {
  return com_ticket_app_v1_events_pb.ModifyEventResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_ticket_app_v1_UpdateEventRequest(arg) {
  if (!(arg instanceof com_ticket_app_v1_events_pb.UpdateEventRequest)) {
    throw new Error('Expected argument of type com.ticket_app.v1.UpdateEventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_ticket_app_v1_UpdateEventRequest(buffer_arg) {
  return com_ticket_app_v1_events_pb.UpdateEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var EventsService = exports.EventsService = {
  getEvent: {
    path: '/com.ticket_app.v1.Events/GetEvent',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_events_pb.EventRequest,
    responseType: com_ticket_app_v1_events_pb.GetEventResponse,
    requestSerialize: serialize_com_ticket_app_v1_EventRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_EventRequest,
    responseSerialize: serialize_com_ticket_app_v1_GetEventResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_GetEventResponse,
  },
  getEvents: {
    path: '/com.ticket_app.v1.Events/GetEvents',
    requestStream: false,
    responseStream: true,
    requestType: com_ticket_app_v1_events_pb.EventsRequest,
    responseType: com_ticket_app_v1_events_pb.GetEventsResponse,
    requestSerialize: serialize_com_ticket_app_v1_EventsRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_EventsRequest,
    responseSerialize: serialize_com_ticket_app_v1_GetEventsResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_GetEventsResponse,
  },
  createEvent: {
    path: '/com.ticket_app.v1.Events/CreateEvent',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_events_pb.CreateEventRequest,
    responseType: com_ticket_app_v1_events_pb.ModifyEventResponse,
    requestSerialize: serialize_com_ticket_app_v1_CreateEventRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_CreateEventRequest,
    responseSerialize: serialize_com_ticket_app_v1_ModifyEventResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_ModifyEventResponse,
  },
  updateEvent: {
    path: '/com.ticket_app.v1.Events/UpdateEvent',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_events_pb.UpdateEventRequest,
    responseType: com_ticket_app_v1_events_pb.ModifyEventResponse,
    requestSerialize: serialize_com_ticket_app_v1_UpdateEventRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_UpdateEventRequest,
    responseSerialize: serialize_com_ticket_app_v1_ModifyEventResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_ModifyEventResponse,
  },
  deleteEvent: {
    path: '/com.ticket_app.v1.Events/DeleteEvent',
    requestStream: false,
    responseStream: false,
    requestType: com_ticket_app_v1_events_pb.DeleteEventRequest,
    responseType: com_ticket_app_v1_events_pb.ModifyEventResponse,
    requestSerialize: serialize_com_ticket_app_v1_DeleteEventRequest,
    requestDeserialize: deserialize_com_ticket_app_v1_DeleteEventRequest,
    responseSerialize: serialize_com_ticket_app_v1_ModifyEventResponse,
    responseDeserialize: deserialize_com_ticket_app_v1_ModifyEventResponse,
  },
};

exports.EventsClient = grpc.makeGenericClientConstructor(EventsService);
