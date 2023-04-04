package user

import (
	"api/src/common"
	"time"
)

type User struct {
	Id        uint
	AvatarUrl string `db:"avatar_url" json:"avatarUrl"`
	FullName  string `db:"full_name"`
	Email     string
	Role      string
	CreateAt  time.Time `db:"created_at"`
	UpdateAt  time.Time `db:"updated_at"`
	Password  string    `json:"-"`
}

type WriteUserBody struct {
	FullName string `validate:"required,min=8,max=30" db:"full_name"`
	Email    string `validate:"required,email,max=30" db:"email"`
	Password string `validate:"min=8,max=32"`
	Role     string `validate:"required"`
}

type UserQuery struct {
	common.BaseQuery
}

type UpdateUserBody struct {
	FullName  string `db:"full_name" validate:"required,min=3,max=30"`
	AvatarUrl string `db:"avatar_url" json:"avatarUrl" validate:"required,max=255"`
	Role      string `db:"role" json:"role" validate:"required"`
}
