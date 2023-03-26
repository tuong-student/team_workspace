package project

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/project")

	route.Post("/create", CreateProject)
	route.Delete("/delete/:id<int;min(1)>", DeleteProject)
	route.Put("/update/:id<int;min(1)>", UpdateProject)
	route.Get("/find", FindProject)
}

func RegisterProjectRepository(c *fiber.Ctx, db *sqlx.DB) {
	Repo := &ProjectSqlxRepo{db: db}
	c.Locals("ProjectRepo", Repo)
}
