package user_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	"golang.org/x/crypto/bcrypt"
)

type CreateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var userReq CreateUserRequest

	json.NewDecoder(r.Body).Decode(&userReq)

	// Check for invalid request body
	if userReq.Email == "" || userReq.Password == "" || userReq.Username == "" {
		resMsg := "invalid request"
		lib.SendResponseMessage(w, resMsg, http.StatusBadRequest)
		return
	}

	// Hash the user's password
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 14)
	if err != nil {
		log.Println(err.Error())
		lib.SendResponseMessage(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Save the newly created user
	db := database.GetInstance()
	db.Create(&models.User{
		Username:     userReq.Username,
		PasswordHash: string(passwordHash),
		Email:        userReq.Email,
	})

	resMsg := "success"
	lib.SendResponseMessage(w, resMsg, http.StatusCreated)
}
