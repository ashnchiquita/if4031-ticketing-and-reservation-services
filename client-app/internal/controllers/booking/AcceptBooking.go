package booking_controller

import (
	"encoding/json"
	"log"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	amqp "github.com/rabbitmq/amqp091-go"
)

type AcceptBookingMessage struct {
	PaymentURL string `json:"paymentUrl"`
	UserID     string `json:"userId"`
}

func AcceptBooking(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		var (
			user    models.User
			msgData AcceptBookingMessage
		)

		log.Printf("[*] Received message on change booking status: %s", msg.Body)

		json.Unmarshal(msg.Body, &msgData)

		db := database.GetInstance()
		result := db.First(&user, "id = ?", msgData.UserID)

		if result.Error != nil {
			log.Println(result.Error.Error())
			continue
		}

		err := lib.SendEmail(user.Email, "Payment URL", msgData.PaymentURL)
		if err != nil {
			log.Println(err.Error())
			continue
		}

		msg.Ack(false)
	}
}
