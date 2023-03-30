package user

import "time"

type User struct {
	Id       uint
	Name     string
	Email    string
	Password string
	CreateAt time.Time `db:"created_at"`
	UpdateAt time.Time `db:"updated_at"`
}

type WriteUserBody struct {
	Name     string `validate:"required,min=2,max=30" db:"name"`
	Email    string `validate:"required,min=10,max=30" db:"email"`
	Password string `validate:"required,min=10,max=30" db:"password"`
}

type UserLogin struct {
	Email    string `validate:"required" db:"email"`
	Password string `validate:"required" db:"password"`
}
