package common

import (
	"api/src/utils"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(c *fiber.Ctx) error {
	var token string
	authHeader := c.Get("Authorization")

	token = strings.TrimPrefix(authHeader, "Bearer ")
	if token == "" {
		return c.Status(http.StatusUnauthorized).JSON("Unauthorized")
	}

	userId, err := utils.ParseToken(token, []byte("jwtsec"))
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON("Unauthorized")
	}

	c.Locals("userId", userId)

	return c.Next()
}
