package user

import (
	"api/src/common"
	"time"
)

type User struct {
	UserResp
	Password string
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

type UserResp struct {
	Id        uint
	AvatarUrl string `db:"avatar_url" json:"avatarUrl"`
	FullName  string `db:"full_name"`
	Email     string
	Role      string
	CreateAt  time.Time `db:"created_at"`
	UpdateAt  time.Time `db:"updated_at"`
}

type UpdateUserBody struct {
	FullName  string `db:"full_name"`
	AvatarUrl string `db:"avatar_url" json:"avatarUrl"`
}
