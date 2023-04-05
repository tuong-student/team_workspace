package admin

import "github.com/gofiber/fiber/v2"

func New(v1 fiber.Router) {
	route := v1.Group("/admin")

	route.Get("/init", Init)
	route.Post("/register", RegisterAdmin)
}
