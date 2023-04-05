package user

import (
	"api/src/common"
	"time"
)

type User struct {
	Id        uint      `json:"id"`
	AvatarUrl string    `json:"avatarUrl" db:"avatar_url"`
	FullName  string    `json:"fullName" db:"full_name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt time.Time `json:"updatedAt" db:"updated_at"`
	Password  string    `json:"-"`
}

type WriteUserBody struct {
	FullName string `validate:"required,min=8,max=30" db:"full_name" json:"fullName"`
	Email    string `validate:"required,email,max=30" db:"email" json:"email"`
	Password string `validate:"min=8,max=32" json:"password"`
	Role     string `validate:"required" json:"role"`
}

type UserQuery struct {
	common.BaseQuery
}

type UpdateUserBody struct {
	FullName  string `db:"full_name" json:"fullName" validate:"required,min=3,max=30"`
	AvatarUrl string `db:"avatar_url" json:"avatarUrl" validate:"required,max=255"`
	Role      string `db:"role" json:"role" validate:"required"`
}
