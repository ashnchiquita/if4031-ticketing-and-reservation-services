package controllers

import (
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
)

func DummyController(w http.ResponseWriter, r *http.Request) {
	db := database.GetInstance()

	db.Create(&models.Dummy{ID: 12, Message: "hello"})

	w.Write([]byte("Hello World kucing terbang"))
}
