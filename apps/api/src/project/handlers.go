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
	Update(id uint, req WriteProjectBody) (*Project, error)
	Delete(id uint) (*Project, error)
	Find(queries ProjectQuery) (*common.BasePaginationResponse[Project], error)
	FindOne(id uint) (*Project, error)
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
// @Failure 400 {string} common.BadRequestError
// @Failure 409 {string} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /project/create [post]
// @tags Project
func CreateProject(ctx *fiber.Ctx) error {
	req := WriteProjectBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	repo := ctx.Locals("ProjectRepo").(ProjectRepository)
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
// @Success 200 {object} Project
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

	repo := ctx.Locals("ProjectRepo").(ProjectRepository)
	project, err := repo.Delete(uint(id))
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.Status(201).JSON(project)
}

// UpdateProject godoc
// @Summary Update project api
// @Description Update a project with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "Project Id"
// @Param project body WriteProjectBody true "Update project"
// @Success 200 {object} Project
// @Failure 400 {string} string
// @Failure 404 {string} string
// @Failure 409 {object} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /project/update/{id} [put]
// @tags Project
func UpdateProject(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	req := WriteProjectBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	repo := ctx.Locals("ProjectRepo").(ProjectRepository)
	project, err := repo.Update(uint(id), req)
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(project)
}

// FindProject godoc
// @Summary Find projects api
// @Description Get a list of categories with coresponding query parameters
// @Accept json
// @Produce json
// @Param page query int false "Project page number"
// @Param pageSize query int false "Project page size return"
// @Param q query string false "Project query"
// @Param sort query string false "Sort direction" Enums(asc, desc) default(desc)
// @Param sortBy query string false "Sort by" Enums(id, name, description) default(id)
// @Success 200 {object} common.BasePaginationResponse[Project]
// @Failure 500 {string} string
// @Router /project/find [get]
// @tags Project
func FindProject(ctx *fiber.Ctx) error {
	queries := new(ProjectQuery)
	if err := ctx.QueryParser(queries); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	repo := ctx.Locals("ProjectRepo").(ProjectRepository)
	projects, err := repo.Find(*queries)

	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(projects)
}

// FindOneProject godoc
// @Summary Find project details api
// @Description Get a project details with coresponding id
// @Accept json
// @Produce json
// @Param id path string true "Project id"
// @Success 200 {object} Project
// @Failure 400
// @Router /project/details/{id} [get]
// @tags Project
func FindOneProject(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")
	if err != nil {
		return err
	}

	repo := ctx.Locals("ProjectRepo").(ProjectRepository)
	project, err := repo.FindOne(uint(id))
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(project)
}
