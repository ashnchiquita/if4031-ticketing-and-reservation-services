# Ticket App

## API Docs

Dokumentasi ini tidak strict, silahkan ubah sesuai yang diinginkan, yang penting ada terdokumentasi interface dari masing2 app

### HTTP APIs

#### 0. /api/v1

| HTTP Method | Endpoint   | Description              |
| ----------- | ---------- | ------------------------ |
| GET         | /health    | Get service health check |

#### 1. /api/v1/booking

| HTTP Method | Endpoint       | Description             |
| ----------- | -------------- | ----------------------- |
| GET         | /              | Get all bookings        |
| GET         | /:id           | Get booking by ID       |
| POST        | /              | Create a new booking    |
| PATCH       | /:id/status    | Update booking status   |
| DELETE      | /:id           | Delete booking by ID    |

#### 2. /api/v1/booking-queue

| HTTP Method | Endpoint       | Description                  |
| ----------- | -------------- | ---------------------------- |
| GET         | /              | Get booking queue            |
| DELETE      | /:id           | Delete booking from queue by ID |

#### 3. /api/v1/event

| HTTP Method | Endpoint       | Description             |
| ----------- | -------------- | ----------------------- |
| GET         | /              | Get all events          |
| GET         | /:id           | Get event by ID         |
| POST        | /              | Create a new event      |
| PUT         | /:id           | Update event by ID      |
| DELETE      | /:id           | Delete event by ID      |

#### 4. /api/v1/seat

| HTTP Method | Endpoint       | Description               |
| ----------- | -------------- | ------------------------- |
| GET         | /              | Get all seats             |
| GET         | /:id           | Get seat by ID            |
| POST        | /              | Create a new seat         |
| PATCH       | /:id/status    | Update seat status by ID  |
| DELETE      | /:id           | Delete seat by ID         |

#### 5. /api/v1/webhook

| HTTP Method | Endpoint               | Description                       |
| ----------- | ---------------------- | --------------------------------- |
| POST        | /payment-status        | Receive payment status webhook    |


## How To Start

Step by step to run a single service:

NOTE: this service has interactions with other services, we recommend for ease of use to run the entire app 

1. Ensure port 5435, 8002 is not used and exposed
2. Copy and rename .env.example to .env
3. Run `docker-compose -f docker-compose.yml up`
4. Hit http://localhost:8002/health and see if it returns properly


## How To Start The Entire App

Step by step to run the entire application

1. Navigate to config folder outside of this folder
2. Follow the step on the README.md file

## How To Migrate

Note: docker will automatically migrate the db's schema. You can see the migrations on ./migrations folder

1. Ensure both container are running and healthy
2. Open the service container's terminal with `docker exec -it [container id or name] sh`
3. Run `npm run drizzle:push`

## How To Seed

1. Ensure both container are running and healthy
2. Open the service container's terminal with `docker exec -it [container id or name] sh`
3. Run `npm run drizzle:seed` 