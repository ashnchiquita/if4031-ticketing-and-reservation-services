package booking_controller

import (
	"encoding/json"
	"log"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	amqp "github.com/rabbitmq/amqp091-go"
)

type AcceptPaymentMessage struct {
	Status     string `json:"status"`
	PaymentURL string `json:"paymentUrl"`
	UserID     string `json:"userId"`
}

func AcceptPayment(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		var msgData AcceptPaymentMessage

		json.Unmarshal(msg.Body, &msgData)

		if msgData.Status == "Success" {
			// Save the successfully created booking
			db := database.GetInstance()
			result := db.Create(&models.BookingHistory{
				UserID: msgData.UserID,
				Status: true,
			})

			// Check if the booking is successfully saved
			if result.Error == nil {
				// ! Ini nge return apa????
				msg.Ack(false)
			}
		} else if msgData.Status == "Fail" {
			// Save the failed booking data
			db := database.GetInstance()
			result := db.Create(&models.BookingHistory{
				UserID: msgData.UserID,
				Status: false,
			})

			// Check if the booking is successfully saved
			if result.Error == nil {
				msg.Ack(false)
			}
		} else {
			log.Println("ERROR: unknown status message from ticket service")
		}
	}
}
