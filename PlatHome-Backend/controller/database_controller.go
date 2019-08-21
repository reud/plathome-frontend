package controller

import (
	"PlatHome-Backend/models"
	"github.com/jinzhu/gorm"
)

type Database struct {
	db *gorm.DB
}

func (d *Database) Close() {
	err := d.db.Close()
	if err != nil {
		panic(err)
	}

}

func NewDatabase(dialect string, settings string) *Database {
	db, err := gorm.Open(dialect, settings)
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&models.Device{})
	return &Database{db: db}
}

func (d *Database) Create(device *models.Device) {
	d.db.Create(device)
}

func (d *Database) FindAll() []*models.Device {
	var devices []*models.Device
	d.db.Find(devices)
	return devices
}

func (d *Database) DeleteByID(id uint) {
	dice := models.Device{}
	dice.ID = id
	d.db.Delete(dice)
}
