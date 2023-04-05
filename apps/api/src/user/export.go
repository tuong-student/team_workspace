package user

import (
	"api/src/common"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

func New(v1 fiber.Router) {
	route := v1.Group("/user")

	route.Use(common.AuthMiddleware, IsAdmin)
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

func IsAdmin(c *fiber.Ctx) error {
	userId, ok := c.Locals("userId").(uint)
	if !ok {
		return c.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	repo := c.Locals("UserRepo").(UserRepository)
	user, err := repo.FindOne(userId)
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return c.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return c.JSON(err.Error())
	}

	if strings.ToLower(user.Role) != "admin" {
		return c.Status(http.StatusForbidden).JSON("Forbidden")
	}

	return c.Next()
}
