package auth

import (
	"api/src/common"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/auth")

	route.Post("/login", Login)
	route.Post("/refresh", RefreshToken)

	registerPrivateRoute(route)
}

func RegisterUserRepository(c *fiber.Ctx, db *sqlx.DB) {
	Repo := &AuthSqlxRepo{db: db}
	c.Locals("AuthRepo", Repo)
}

func registerPrivateRoute(route fiber.Router) {
	route.Use(common.AuthMiddleware)
	route.Get("/me", Me)
}
