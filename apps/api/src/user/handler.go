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
	Update(id uint, req UpdateUserBody) (*User, error)
	Delete(id uint) (*User, error)
	Find(queries UserQuery) (*common.BasePaginationResponse[User], error)
	FindOne(id uint) (*User, error)
	Count() (*uint, error)
}

type UserSqlxRepo struct {
	db *sqlx.DB
}

// CreateUser godoc
// @Summary Create user api
// @Description Create a new user with coresponding information
// @Accept json
// @Produce json
// @Param user body WriteUserBody true "New User body"
// @Success 201 {object} User
// @Failure 400 {string} common.BadRequestError
// @Failure 409 {string} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /user/create [post]
// @Security ApiKeyAuth
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

// DeleteUser godoc
// @Summary Delete user api
// @Description Delete a user with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "User id"
// @Success 200 {object} User
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /user/delete/{id} [delete]
// @Security ApiKeyAuth
// @tags User
func DeleteUser(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	repo := ctx.Locals("UserRepo").(UserRepository)
	user, err := repo.Delete(uint(id))
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.Status(201).JSON(user)
}

// UpdateUser godoc
// @Summary Update user api
// @Description Update a user with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "User Id"
// @Param user body UpdateUserBody true "Update project"
// @Success 200 {object} User
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 409 {object} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /user/update/{id} [put]
// @Security ApiKeyAuth
// @tags User
func UpdateUser(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	req := UpdateUserBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	repo := ctx.Locals("UserRepo").(UserRepository)
	user, err := repo.Update(uint(id), req)
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(user)
}

// FindUser godoc
// @Summary Find users api
// @Description Get a list of categories with coresponding query parameters
// @Accept json
// @Produce json
// @Param page query int false "User page number"
// @Param pageSize query int false "User page size return"
// @Param q query string false "User query"
// @Param sort query string false "Sort direction" Enums(asc, desc) default(desc)
// @Param sortBy query string false "Sort by" Enums(id, name, description) default(id)
// @Success 200 {object} common.BasePaginationResponse[User]
// @Failure 500 {string} string
// @Router /user/find [get]
// @Security ApiKeyAuth
// @tags User
func FindUser(ctx *fiber.Ctx) error {
	queries := new(UserQuery)
	if err := ctx.QueryParser(queries); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	repo := ctx.Locals("UserRepo").(UserRepository)
	users, err := repo.Find(*queries)

	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(users)
}

// FindOneUser godoc
// @Summary Find user details api
// @Description Get a user details with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "User id"
// @Success 200 {object} User
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Router /user/details/{id} [get]
// @Security ApiKeyAuth
// @tags User
func FindOneUser(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON("Id must be number")
	}

	repo := ctx.Locals("UserRepo").(UserRepository)
	user, err := repo.FindOne(uint(id))
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(user)
}
