package user_controller

import (
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	"github.com/go-chi/chi/v5"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	db := database.GetInstance()
	db.Delete(&models.User{}, "id = ?", chi.URLParam(r, "userId"))

	log.Println(chi.URLParam(r, "userId"))

	resMsg := "success"
	lib.SendResponseMessage(w, resMsg, http.StatusOK)
}
