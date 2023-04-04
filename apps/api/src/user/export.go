package user

import (
	"api/src/common"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/user")

	route.Use(common.AuthMiddleware)
	route.Post("/create", CreateUser)
	route.Delete("/delete/:id<int;min(1)>", DeleteUser)
	route.Put("/update/:id<int;min(1)>", UpdateUser)
	route.Get("/find", FindUser)
	route.Get("/details/:id<int;min(1)>", FindOneUser)
}

func RegisterUserRepo(c *fiber.Ctx, db *sqlx.DB) {
	Repo := &UserSqlxRepo{db: db}
	c.Locals("UserRepo", Repo)
}
