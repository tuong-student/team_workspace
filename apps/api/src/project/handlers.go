package project

import (
	"api/src/common"
	"errors"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

type ProjectRepository interface {
	Insert(req WriteProjectBody) (*Project, error)
	// Update(id uint, req WriteProjectBody) (*Project, error)
	Delete(id uint) (*Project, error)
	// Find(queries common.BaseQuery) (common.BasePaginationResponse[Project], error)
}

type ProjectSqlxRepo struct {
	db *sqlx.DB
}

// CreateProject godoc
// @Summary Create project api
// @Description Create a new project with coresponding information
// @Accept json
// @Produce json
// @Param project body WriteProjectBody true "New Project body"
// @Success 201 {object} Project
// @Failure 422 {object} common.ErrorResponse
// @Failure 500 {string} string
// @Router /project/create [post]
// @tags Project
func CreateProject(ctx *fiber.Ctx) error {
	req := WriteProjectBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON("Payload does not include required fields")
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusConflict).JSON(err)
	}

	repo := ctx.Locals("ProjectRepo").(*ProjectSqlxRepo)
	createdProject, err := repo.Insert(req)
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.Status(201).JSON(createdProject)
}

// DeleteProject godoc
// @Summary Delete project api
// @Description Delete a project with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "Project id"
// @Success 201 {object} Project
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /project/delete/{id} [delete]
// @tags Project
func DeleteProject(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	repo := ctx.Locals("ProjectRepo").(*ProjectSqlxRepo)
	product, err := repo.Delete(uint(id))
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.Status(201).JSON(product)
}
