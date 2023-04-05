package project

import (
	"api/src/common"
	"time"
)

type Project struct {
	Id          uint      `json:"id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"`
	Category    string    `json:"category"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
}

type WriteProjectBody struct {
	Name        string  `validate:"required,min=3,max=50" db:"name"`
	Description *string `validate:"omitempty,max=500" db:"description"`
	Category    string  `validate:"max=20" db:"category"`
}

type ProjectQuery struct {
	common.BaseQuery
}
