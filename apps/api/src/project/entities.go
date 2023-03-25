package project

import "time"

type Project struct {
	Id          uint
	Name        string
	Description *string
	Category    string
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}

type WriteProjectBody struct {
	Name        string  `validate:"required,min=3,max=50" db:"name"`
	Description *string `validate:"omitempty,max=500" db:"description"`
	Category    string  `validate:"max=20" db:"category"`
}
