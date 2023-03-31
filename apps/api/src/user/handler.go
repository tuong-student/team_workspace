package user

import (
	"api/src/common"
	"api/src/utils"
	"errors"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

type UserRepository interface {
	Insert(req WriteUserBody) (*User, error)
}

type UserSqlxRepo struct {
	db *sqlx.DB
}

// CreateUser godoc
// @Summary Create project api
// @Description Create a new project with coresponding information
// @Accept json
// @Produce json
// @Param project body WriteUserBody true "New Project body"
// @Success 201 {object} User
// @Failure 400 {string} common.BadRequestError
// @Failure 409 {string} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /user/create [post]
// @tags User
func CreateUser(ctx *fiber.Ctx) error {
	req := WriteUserBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	hashPassword, err := utils.GenerateFromPassword(req.Password)
	req.Password = *hashPassword
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	repo := ctx.Locals("UserRepo").(UserRepository)
	createdUser, err := repo.Insert(req)
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.Status(201).JSON(createdUser)
}
