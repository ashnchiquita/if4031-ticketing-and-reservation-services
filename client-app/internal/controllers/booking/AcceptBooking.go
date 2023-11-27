package booking_controller

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func AcceptBooking(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		log.Printf("[*] Received message to booking: %s", msg.Body)
		msg.Ack(false)
	}
}
