package email_controller

import (
	"encoding/json"
	"log"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	amqp "github.com/rabbitmq/amqp091-go"
)

type AcceptEmailMessage struct {
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Url     string `json:"url"`
}

func AcceptEmail(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		var msgData AcceptEmailMessage

		log.Printf("[*] Received message on email: %s", msg.Body)

		json.Unmarshal(msg.Body, &msgData)

		err := lib.SendEmail(msgData.Email, msgData.Subject, msgData.Url)
		if err == nil {
			msg.Ack(false)
		}
	}
}
