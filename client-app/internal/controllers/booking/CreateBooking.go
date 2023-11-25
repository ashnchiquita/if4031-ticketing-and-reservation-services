package booking_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
)

type CreateBookingRequest struct {
	SeatId string `json:"seatId"`
	UserId string `json:"userId"`
}

func CreateBooking(w http.ResponseWriter, r *http.Request) {
	var bookingReq CreateBookingRequest

	json.NewDecoder(r.Body).Decode(&bookingReq)

	// Check for invalid request body
	if bookingReq.UserId == "" || bookingReq.SeatId == "" {
		msg := lib.ResponseMessage{
			Message: "invalid request",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Check if the user id is valid
	db := database.GetInstance()
	result := db.First(&models.User{}, "id = ?", bookingReq.UserId)

	if result.Error != nil {
		log.Println(result.Error.Error())
		msg := lib.ResponseMessage{
			Message: "invalid user id",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Forward booking to ticket service
	log.Println("Ceritanya manggil ticket service")
	resMsg := "Error"

	if resMsg == "Success" {
		msg := lib.ResponseMessage{
			Message: resMsg,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(msg)

	} else if resMsg == "Error" {
		// Save the failed booking data
		db := database.GetInstance()
		result := db.Create(&models.BookingHistory{
			UserID: bookingReq.UserId,
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

		// ! Masih bingung ini status code yg cocok apa
		msg := lib.ResponseMessage{
			Message: resMsg,
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
