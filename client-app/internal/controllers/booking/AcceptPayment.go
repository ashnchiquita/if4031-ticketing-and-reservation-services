package booking_controller

import (
	"encoding/json"
	"log"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	amqp "github.com/rabbitmq/amqp091-go"
)

type AcceptPaymentMessage struct {
	Status    string `json:"status"`
	PdfURL    string `json:"pdfUrl"`
	BookingID string `json:"bookingId"`
	UserID    string `json:"userId"`
}

func AcceptPayment(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		var (
			user    models.User
			msgData AcceptPaymentMessage
		)

		log.Printf("[*] Received message on payment: %s", msg.Body)

		json.Unmarshal(msg.Body, &msgData)

		db := database.GetInstance()
		result := db.First(&user, "id = ?", msgData.UserID)

		if result.Error != nil {
			log.Println(result.Error.Error())
			continue
		}

		if msgData.Status == "success" || msgData.Status == "failed" {
			// Save the successfully created booking
			db := database.GetInstance()
			result := db.Create(&models.BookingHistory{
				UserID: msgData.UserID,
				Status: msgData.Status == "success",
			})

			// Check if the booking is successfully saved
			if result.Error == nil {
				err := lib.SendEmail(user.Email, "Booking Status", msgData.PdfURL)
				if err != nil {
					log.Println(err.Error())
					continue
				}

				msg.Ack(false)
			}
		} else {
			log.Println("ERROR: unknown status message from ticket service")
		}
	}
}
