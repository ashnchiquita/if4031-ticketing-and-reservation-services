package queues

import (
	"log"

	booking_controller "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/controllers/booking"
	amqp "github.com/rabbitmq/amqp091-go"
)

func InitPaymentQueue() {
	conn, err := amqp.Dial("amqp://guest:guest@tubes-message-broker:5672/")
	if err != nil {
		log.Panicf("Failed to connect to RabbitMQ: %s", err.Error())
		return
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Panicf("Failed to open a channel: %s", err.Error())
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
