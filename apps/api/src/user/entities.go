package user

import (
	"api/src/common"
	"time"
)

type User struct {
	Id       uint
	FullName string `db:"full_name"`
	Email    string
	Password string
	CreateAt time.Time `db:"created_at"`
	UpdateAt time.Time `db:"updated_at"`
}

type WriteUserBody struct {
	FullName string `validate:"required,min=8,max=30" db:"full_name"`
	Email    string `validate:"required,min=10,max=30" db:"email"`
	Password string `validate:"min=8,max=32"`
}

type UserQuery struct {
	common.BaseQuery
}
