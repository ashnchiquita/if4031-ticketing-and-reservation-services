package queues

import (
	"fmt"
	"log"
	"os"
	"time"

	booking_controller "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/controllers/booking"
	amqp "github.com/rabbitmq/amqp091-go"
)

func InitPaymentQueue() {
	tryAttempt := 0

	user := os.Getenv("MESSAGE_BROKER_USER")
	pass := os.Getenv("MESSAGE_BROKER_PASSWORD")
	port := os.Getenv("MESSAGE_BROKER_PORT")

	dsn := fmt.Sprintf("amqp://%s:%s@tubes-message-broker:%s/", user, pass, port)

	conn, err := amqp.Dial(dsn)
	for err != nil && tryAttempt < 5 {
		log.Printf("[RETRYING] Failed to connect to RabbitMQ: %s", err.Error())
		time.Sleep(10 * time.Second)
		conn, err = amqp.Dial(dsn)
		tryAttempt++
	}

	if err != nil {
		log.Panicf("[FAIL] Failed to connect to RabbitMQ: %s", err.Error())
		return
	}

	defer conn.Close()

	tryAttempt = 0
	ch, err := conn.Channel()
	for err != nil && tryAttempt < 5 {
		log.Printf("[RETRYING] Failed to open a channel: %s", err.Error())
		time.Sleep(10 * time.Second)
		ch, err = conn.Channel()
		tryAttempt++
	}

	if err != nil {
		log.Printf("[FAIL] Failed to open a channel: %s", err.Error())
		return
	}

	defer ch.Close()

	queue, err := ch.QueueDeclare("payment_message", true, false, false, false, nil)
	if err != nil {
		log.Panicf("Failed to declare a queue: %s", err.Error())
		return
	}

	messages, err := ch.Consume(queue.Name, "", false, false, false, false, nil)
	if err != nil {
		log.Panicf("Failed to register a consumer: %s", err.Error())
		return
	}

	var forever chan struct{}

	go booking_controller.AcceptPayment(messages)

	log.Printf("[*] Waiting for messages")
	<-forever
}
