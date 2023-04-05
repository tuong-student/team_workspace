package project

import (
	"api/src/common"
	"api/src/user"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/project")

	route.Use(common.AuthMiddleware)
	route.Get("/find", FindProject)
	route.Get("/details/:id<int;min(1)>", FindOneProject)
	registerIsAdminGuard(route)
}

func RegisterProjectRepository(c *fiber.Ctx, db *sqlx.DB) {
	Repo := &ProjectSqlxRepo{db: db}
	c.Locals("ProjectRepo", Repo)
}

func registerIsAdminGuard(route fiber.Router) {
	route.Use(user.IsAdmin)
	route.Post("/create", CreateProject)
	route.Delete("/delete/:id<int;min(1)>", DeleteProject)
	route.Put("/update/:id<int;min(1)>", UpdateProject)
}
