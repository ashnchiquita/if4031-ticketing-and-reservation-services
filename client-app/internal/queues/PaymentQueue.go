package queues

import (
	"log"

	booking_controller "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/controllers/booking"
	messagebroker "github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/message-broker"
)

func InitPaymentQueue() {
	conn := messagebroker.GetInstance()

	ch, err := conn.Channel()
	if err != nil {
		log.Printf("Failed to open a channel: %s", err.Error())
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

	log.Printf("[*] Payment waiting for messages")
	<-forever
}
