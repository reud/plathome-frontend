package models

import (
	"PlatHome-Backend/gen/models"
	"github.com/jinzhu/gorm"
)

// for GORM

type Device struct {
	*models.Device
	gorm.Model
}
