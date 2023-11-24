package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	"github.com/ashnchiquita/if4031-ticketing-and-reservation-services/internal/controllers"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading env file")
	}

	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Post("/user", controllers.CreateUser)
	r.Get("/user/{userId}", controllers.GetUserById)
	r.Put("/user", controllers.UpdateUser)
	r.Delete("/user/{userId}", controllers.DeleteUser)

	http.ListenAndServe(":3333", r)
}
