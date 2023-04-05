package admin

import (
	"api/src/common"
	"api/src/user"
	"api/src/utils"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

// Init godoc
// @Summary Init details api
// @Description Get application initial state
// @Accept json
// @Produce json
// @Success 200 {object} InitResp
// @Failure 500 {string} string
// @Router /admin/init [get]
// @tags Admin
func Init(c *fiber.Ctx) error {
	r := c.Locals("UserRepo").(user.UserRepository)
	count, err := r.Count()
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return c.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return c.JSON(err.Error())
	}

	resp := InitResp{HasAdmin: *count > 0}
	return c.JSON(resp)
}

// RegisterAdmin godoc
// @Summary Register admin api
// @Description Create a new admin for the whole system
// @Accept json
// @Produce json
// @Param admin body WriteAdminBody true "New admin information"
// @Success 201 {object} user.User
// @Failure 400 {string} common.BadRequestError
// @Failure 409 {string} string
// @Failure 422 {object} []common.ErrorResponse
// @Failure 500 {string} string
// @Router /admin/register [post]
// @tags Admin
func RegisterAdmin(c *fiber.Ctx) error {
	req := WriteAdminBody{}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	r := c.Locals("UserRepo").(user.UserRepository)
	count, err := r.Count()
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return c.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return c.JSON(err.Error())
	}

	if *count > 0 {
		return c.Status(http.StatusConflict).JSON("Admin already exist")
	}

	hashPassword, err := utils.GenerateFromPassword("admin123")
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	admin, err := r.
		Insert(user.WriteUserBody{
			FullName: "admin deep try",
			Email:    "admin@gmail.com",
			Password: *hashPassword,
			Role:     "admin",
		})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	return c.Status(http.StatusCreated).JSON(admin)
}
