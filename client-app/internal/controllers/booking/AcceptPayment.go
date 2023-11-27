package booking_controller

import (
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type AcceptPaymentRequest struct {
	Status     string `json:"status"`
	PaymentURL string `json:"paymentUrl"`
}

func AcceptPayment(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		var req AcceptPaymentRequest

		log.Printf("Received message: %s", msg.Body)
		json.Unmarshal(msg.Body, &req)

		log.Println(req.Status, req.PaymentURL)

		msg.Ack(false)
	}
}
