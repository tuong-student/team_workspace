package project

import (
	"api/src/common"
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

type ProjectRepository interface {
	Insert(req WriteProjectBody) (*Project, error)
	/* Update(id uint, req WriteProjectBody) (*Project, error)
	Delete(id uint) (*Project, error)
	Find(queries common.BaseQuery) (common.BasePaginationResponse[Project], error) */
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
		return ctx.Status(422).JSON("Payload does not include required fields")
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(422).JSON(err)
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
