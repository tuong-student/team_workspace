package user

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/user")

	route.Post("/create", CreateUser)
}

func RegisterUserRepo(c *fiber.Ctx, db *sqlx.DB) {
	Repo := &UserSqlxRepo{db: db}
	c.Locals("UserRepo", Repo)
}
