package user_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/go-chi/chi/v5"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	db := database.GetInstance()
	db.Delete(&models.User{}, "id = ?", chi.URLParam(r, "userId"))

	log.Println(chi.URLParam(r, "userId"))

	msg := lib.ResponseMessage{
		Message: "success",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(msg)
}
