# Ticket App

## API Docs

### HTTP APIs

| HTTP Method | Endpoint                         | Description                              |
| ----------- | -------------------------------- | ---------------------------------------- |
| GET         | `/event`                         | Get events                               |
| GET         | `/event/:eventId`                | Get event by event id                    |
| POST        | `/event`                         | Create event                             |
| PUT         | `/event/:eventId`                | Edit event by event id                   |
| DELETE      | `/event/:eventId`                | Delete event by event id                 |
| GET         | `/seat`                          | Get seats                                |
| GET         | `/seat/:seatId`                  | Get seat by seat id                      |
| POST        | `/seat`                          | Create seat                              |
| PATCH       | `/seat/:seatId`                  | Edit seat status by seat id              |
| DELETE      | `/seat/:seatId`                  | Delete seat by seat id                   |
| GET         | `/booking`                       | Get bookings                             |
| GET         | `/booking/:bookingId`            | Get booking by booking id                |
| POST        | `/booking`                       | Create booking                           |
| PATCH       | `/booking/:bookingId`            | Edit booking status by booking id        |
| DELETE      | `/booking/:bookingId`            | Delete booking by booking id             |
| GET         | `/booking-queue`                 | Get booking queue by booking queue id    |
| DELETE      | `/booking-queue/:bookingQueueId` | Delete booking queue by booking queue id |

## How To Start

1. Follow instruction to run all container [here](../readme.md).
