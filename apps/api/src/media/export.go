package media

import (
	"api/src/common"

	"github.com/gofiber/fiber/v2"
)

func New(v1 fiber.Router) {
	route := v1.Group("/media")

	route.Get("/:objectName<minLen(1)>", GetMedia)
	route.Use(common.AuthMiddleware)
	route.Post("/upload", UploadMedia)
}
