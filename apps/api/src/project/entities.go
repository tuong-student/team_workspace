package project

import (
	"api/src/common"
	"api/src/user"
	"time"
)

type Project struct {
	Id        uint   `json:"id"`
	Name      string `json:"name"`
	Key       string `json:"key"`
	IconUrl   string `json:"iconUrl" db:"icon_url"`
	OwnerId   uint   `json:"-" db:"owner_id"`
	user.User `json:"owner"`
	Category  string    `json:"category"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt time.Time `json:"updatedAt" db:"updated_at"`
}

type BaseProjectBody struct {
	Name     string `validate:"required,min=3,max=255" db:"name"`
	Key      string `validate:"omitempty,max=50" db:"key"`
	Category string `validate:"max=20" db:"category"`
}

type WriteProjectBody struct {
	BaseProjectBody
	OwnerId uint `json:"-"`
}

type UpdateProjectBody struct {
	BaseProjectBody
	IconUrl string `json:"iconUrl"`
}

type ProjectQuery struct {
	common.BaseQuery
}
