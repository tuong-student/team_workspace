package auth

import (
	"api/src/common"
	"api/src/user"
	"api/src/utils"
	"errors"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

type AuthRepository interface {
	Login(email string) (*user.User, error)
}

type AuthSqlxRepo struct {
	db *sqlx.DB
}

// Login godoc
// @Summary Login api
// @Description Login api
// @Accept json
// @Produce json
// @Param project body LoginBody true "Login payload"
// @Success 200 {object} LoginResp
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /auth/login [post]
// @tags Auth
func Login(ctx *fiber.Ctx) error {
	req := LoginBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	repo := ctx.Locals("AuthRepo").(AuthRepository)
	user, err := repo.Login(req.Email)
	if err != nil {
		var httpErr common.HttpError
		if errors.As(err, &httpErr) {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	res, err := utils.VerifyPassword(req.Password, user.Password)
	if err != nil {
		return ctx.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	if !res {
		return ctx.Status(http.StatusConflict).JSON("Wrong password")
	}

	AcccessToken, RefreshToken := utils.GenerateToken(user.Id, []byte("jwtsec"), []byte("refreshSec"))

	token := LoginResp{
		AccessToken:  AcccessToken,
		RefreshToken: RefreshToken,
	}

	return ctx.JSON(token)
}
