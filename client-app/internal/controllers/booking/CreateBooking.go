package booking_controller

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
)

type CreateBookingRequest struct {
	SeatId string `json:"seatId"`
	UserId string `json:"userId"`
}

type TicketBookingResponse struct {
	Message string `json:"message"`
}

func CreateBooking(w http.ResponseWriter, r *http.Request) {
	var (
		bookingReq CreateBookingRequest
		ticketRes  TicketBookingResponse
	)

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
	reqBody := []byte(`{
		"userId": "` + bookingReq.UserId + `",
		"seatId": "` + bookingReq.SeatId + `"
	}`)
	req, err := http.NewRequest("POST", "http://host.docker.internal:8002/api/v1/booking", bytes.NewBuffer(reqBody))
	if err != nil {
		msg := lib.ResponseMessage{
			Message: err.Error(),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(msg)

		return
	}
	req.Header.Add("Content-Type", "application/json")

	res, err := (&http.Client{}).Do(req)
	if err != nil {
		msg := lib.ResponseMessage{
			Message: err.Error(),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(msg)

		return
	}
	defer res.Body.Close()

	json.NewDecoder(res.Body).Decode(&ticketRes)

	if ticketRes.Message == "Success" {
		msg := lib.ResponseMessage{
			Message: ticketRes.Message,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(msg)

	} else if ticketRes.Message == "Error" {
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
