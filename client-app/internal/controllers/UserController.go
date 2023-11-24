package controllers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/database"
	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/models"
	"github.com/go-chi/chi/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type ResponseMessage struct {
	Message string `json:"message"`
}

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
		msg := ResponseMessage{
			Message: "invalid request",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Hash the user's password
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 14)
	if err != nil {
		log.Println(err.Error())
		msg := ResponseMessage{
			Message: err.Error(),
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Save the newly created user
	db := database.GetInstance()
	db.Create(&models.User{
		Username:     userReq.Username,
		PasswordHash: string(passwordHash),
		Email:        userReq.Email,
	})

	msg := ResponseMessage{
		Message: "success",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(msg)
}

type UpdateUserRequest struct {
	ID       uint   `json:"id"`
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

	// Check for invalid request body
	if userReq.ID == 0 {
		msg := ResponseMessage{
			Message: "invalid request",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(msg)

		return
	}

	// Find the user in the database
	db := database.GetInstance()
	result := db.First(&user, userReq.ID)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Println(result.Error.Error())
		msg := ResponseMessage{
			Message: "invalid user id",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(msg)

		return
	}

	log.Println(&user)
	log.Println(userReq)

	// Hash the newly updated password
	if userReq.Password != "" {
		passwordHash, err = bcrypt.GenerateFromPassword([]byte(userReq.Password), 14)
		if err != nil {
			log.Println(err.Error())
			msg := ResponseMessage{
				Message: err.Error(),
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(msg)

			return
		}
	}

	// Updates the user model
	db.Model(&user).Updates(models.User{
		Username:     userReq.Username,
		PasswordHash: string(passwordHash),
		Email:        userReq.Email,
	})

	msg := ResponseMessage{
		Message: "success",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(msg)
}

type GetUserByIdResponse struct {
	ResponseMessage
	Data models.User
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	var user models.User

	// Find the user in the database
	db := database.GetInstance()

	result := db.First(&user, chi.URLParam(r, "userId"))
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		log.Println(result.Error.Error())
		msg := ResponseMessage{
			Message: "invalid user id",
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(msg)

		return
	}

	msg := GetUserByIdResponse{
		ResponseMessage: ResponseMessage{
			Message: "success",
		},
		Data: user,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(msg)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	db := database.GetInstance()
	db.Delete(&models.User{}, chi.URLParam(r, "userId"))

	log.Println(chi.URLParam(r, "userId"))

	msg := ResponseMessage{
		Message: "success",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(msg)
}
