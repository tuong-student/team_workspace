package user

import (
	"api/src/common"
	"api/src/utils"
	"fmt"

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
	createFirstAdmin(Repo)
	c.Locals("UserRepo", Repo)
}

func createFirstAdmin(r *UserSqlxRepo) {
	var total uint
	if err := r.db.Get(&total, "SELECT COUNT(*) FROM users"); err != nil {
		panic(fmt.Sprintf("Error count user: %s", err))
	}

	if total == 0 {
		hashPassword, err := utils.GenerateFromPassword("admin123")
		if err != nil {
			panic(fmt.Sprintf("Can't hash first admin password: %s", err))
		}

		if _, err := r.
			Insert(WriteUserBody{
				FullName: "admin deep try",
				Email:    "admin@gmail.com",
				Password: *hashPassword,
				Role:     "admin",
			}); err != nil {
			panic(fmt.Sprintf("Can't create first admin: %s", err))
		}
	}
}
