package booking_controller

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/producers"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
)

type CreateBookingRequest struct {
	SeatId string `json:"seatId"`
	UserId string `json:"userId"`
}

type TicketBookingResponse struct {
	Message string `json:"message"`
	Data    struct {
		PaymentURL string `json:"paymentUrl"`
		PdfURL     string `json:"pdfUrl"`
	} `json:"data"`
}

func CreateBooking(w http.ResponseWriter, r *http.Request) {
	var (
		bookingReq CreateBookingRequest
		ticketRes  TicketBookingResponse
		user       models.User
	)

	json.NewDecoder(r.Body).Decode(&bookingReq)

	// Check for invalid request body
	if bookingReq.UserId == "" || bookingReq.SeatId == "" {
		resMsg := "invalid request"
		lib.SendResponseMessage(w, resMsg, http.StatusBadRequest)
		return
	}

	// Check if the user id is valid
	db := database.GetInstance()
	result := db.First(&user, "id = ?", bookingReq.UserId)

	if result.Error != nil {
		log.Println(result.Error.Error())

		resMsg := "invalid user id"
		lib.SendResponseMessage(w, resMsg, http.StatusNotFound)

		return
	}

	// Forward booking to ticket service
	reqBody := []byte(`{
		"userId": "` + bookingReq.UserId + `",
		"seatId": "` + bookingReq.SeatId + `"
	}`)

	req, err := http.NewRequest("POST", "http://host.docker.internal:8002/api/v1/booking", bytes.NewBuffer(reqBody))
	if err != nil {
		lib.SendResponseMessage(w, err.Error(), http.StatusInternalServerError)
		return
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("api-key", "LSSczkB2q7AdswtHVIlJGnezySoJKjRnb8GkPod2uF5u4L8tlWmQgSqtx56RKPhO")

	res, err := (&http.Client{}).Do(req)
	if err != nil {
		lib.SendResponseMessage(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	json.NewDecoder(res.Body).Decode(&ticketRes)
	if ticketRes.Message == "Success" {
		producers.EmailProducer(user.Email, "Payment URL", ticketRes.Data.PaymentURL)

		lib.SendResponseMessage(w, ticketRes.Message, http.StatusOK)

	} else if ticketRes.Message == "External call failed. Please try again later." {
		// Send booking failed email
		producers.EmailProducer(user.Email, "Booking Failed", ticketRes.Data.PdfURL)

		lib.SendResponseMessage(w, ticketRes.Message, http.StatusInternalServerError)

	} else {
		lib.SendResponseMessage(w, ticketRes.Message, http.StatusOK)
	}
}
