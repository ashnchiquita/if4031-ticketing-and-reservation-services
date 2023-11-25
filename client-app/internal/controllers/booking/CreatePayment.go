package booking_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
)

type CreatePaymentRequest struct {
	BookingId string `json:"bookingId"`
}

// TODO: Adjust with the return type from ticket service
type TicketServiceResponse struct {
	Message string
	UserId  string
}

func CreatePayment(w http.ResponseWriter, r *http.Request) {
	var paymentReq CreatePaymentRequest

	json.NewDecoder(r.Body).Decode(&paymentReq)

	// Check for invalid request body
	if paymentReq.BookingId == "" {
		msg := lib.ResponseMessage{
			Message: "invalid request",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Forward payment to ticket service
	log.Println("Ceritanya manggil ticket service buat bayar")
	ticketRes := TicketServiceResponse{
		Message: "Error",
		UserId:  "cdee8fc0-84bd-4322-91fd-d4dc39b4bc22",
	}

	if ticketRes.Message == "Success" {
		// Save the successfully created booking
		db := database.GetInstance()
		result := db.Create(&models.BookingHistory{
			UserID: ticketRes.UserId,
			Status: true,
		})

		// Check if the booking is successfully saved
		if result.Error != nil {
			msg := lib.ResponseMessage{
				Message: result.Error.Error(),
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(msg)

			return
		}

		msg := lib.ResponseMessage{
			Message: ticketRes.Message,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(msg)

	} else if ticketRes.Message == "Error" {
		// Save the failed booking data
		db := database.GetInstance()
		result := db.Create(&models.BookingHistory{
			UserID: ticketRes.UserId,
			Status: false,
		})

		// Check if the booking is successfully saved
		if result.Error != nil {
			msg := lib.ResponseMessage{
				Message: result.Error.Error(),
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(msg)

			return
		}

		// ! Masih bingung ini message + status code yg cocok apa
		msg := lib.ResponseMessage{
			Message: ticketRes.Message,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(msg)

	} else {
		// Handle error from other services
		log.Println("ERROR: unknown response message from ticket service")
		msg := lib.ResponseMessage{
			Message: "unknown response message from ticket service",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(msg)
	}
}
