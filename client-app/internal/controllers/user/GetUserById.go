package user_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	"github.com/go-chi/chi/v5"
)

type GetUserByIdResponse struct {
	lib.ResponseMessage
	Data models.User
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	var user models.User

	// Find the user in the database
	db := database.GetInstance()

	result := db.First(&user, "id = ?", chi.URLParam(r, "userId"))
	if result.Error != nil {
		log.Println(result.Error.Error())

		resMsg := "invalid user id"
		lib.SendResponseMessage(w, resMsg, http.StatusNotFound)
		return
	}

	msg := GetUserByIdResponse{
		ResponseMessage: lib.ResponseMessage{
			Message: "success",
		},
		Data: user,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(msg)
}
