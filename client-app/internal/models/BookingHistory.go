package models

import "gorm.io/gorm"

type BookingHistory struct {
	gorm.Model
	UserId uint
	Status bool
}
