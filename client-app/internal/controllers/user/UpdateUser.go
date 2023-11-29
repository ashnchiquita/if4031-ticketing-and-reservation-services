package user_controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/lib"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/singletons/database"
	"github.com/go-chi/chi/v5"
	"golang.org/x/crypto/bcrypt"
)

type UpdateUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var (
		userReq      UpdateUserRequest
		user         models.User
		passwordHash []byte
		err          error
	)

	json.NewDecoder(r.Body).Decode(&userReq)

	// Find the user in the database
	db := database.GetInstance()
	result := db.First(&user, "id = ?", chi.URLParam(r, "userId"))

	if result.Error != nil {
		log.Println(result.Error.Error())

		resMsg := "invalid user id"
		lib.SendResponseMessage(w, resMsg, http.StatusNotFound)
		return
	}

	// Hash the newly updated password
	if userReq.Password != "" {
		passwordHash, err = bcrypt.GenerateFromPassword([]byte(userReq.Password), 14)
		if err != nil {
			log.Println(err.Error())
			lib.SendResponseMessage(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// Updates the user model
	db.Model(&user).Updates(models.User{
		Username:     userReq.Username,
		PasswordHash: string(passwordHash),
		Email:        userReq.Email,
	})

	resMsg := "success"
	lib.SendResponseMessage(w, resMsg, http.StatusCreated)
}
