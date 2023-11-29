# Tugas Besar PAT 2023/2024

| NIM      | Nama                     |
| -------- | ------------------------ |
| 13521129 | Chiquita Ahsanunnisa     |
| 13521149 | Rava Maulana Azzikri     |
| 13521153 | Made Debby Almadea Putri |

---

## Client App

| System Entity | Tech        |
| ------------- | ----------- |
| API Server    | Golang, Chi |
| Database      | PostgreSQL  |
| Queue         | RabbitMQ    |

## Ticket App

| System Entity | Tech                         |
| ------------- | ---------------------------- |
| API Server    | Node.js, Typescript, Express |
| Database      | PostgreSQL                   |
| Queue         | RabbitMQ                     |

## Payment App

| System Entity | Tech                         |
| ------------- | ---------------------------- |
| API Server    | Node.js, Typescript, Express |
| Database      | Cassandra                    |
| Queue         | Bull (Redis)                 |

## Dependency

1. [Docker](https://docs.docker.com/engine/install/)

## How To Run

1. Turn on Docker Daemon.
2. Write down environment variables in `.env` files. Follow examples from files named `.env.example`.
3. Change current directory to `/config`.
4. Run `docker compose up --build`.
