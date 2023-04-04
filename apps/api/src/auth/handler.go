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

	AccessToken, RefreshToken := utils.GenerateToken(user.Id, []byte("jwtsec"), []byte("refreshSec"))

	token := LoginResp{
		AccessToken:  AccessToken,
		RefreshToken: RefreshToken,
	}

	return ctx.JSON(token)
}

// RefreshToken godoc
// @Summary Refresh token api
// @Description Refresh token api
// @Accept json
// @Produce json
// @Param refreshToken body RefreshTokenBody true "Refresh token payload"
// @Success 200 {object} LoginResp
// @Failure 400 {string} string
// @Failure 422 {string} string
// @Failure 500 {string} string
// @Router /auth/refresh [post]
// @tags Auth
func RefreshToken(ctx *fiber.Ctx) error {
	req := RefreshTokenBody{}
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(err)
	}

	if err := common.ValidatorAdapter.Exec(req); err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	userId, err := utils.ParseToken(req.RefreshToken, []byte("refreshSec"))
	if err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON("Refresh token expired")
	}

	accessToken, refreshToken := utils.GenerateToken(userId, []byte("jwtsec"), []byte("refreshSec"))
	token := LoginResp{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	return ctx.JSON(token)
}

// Me godoc
// @Summary User profile api
// @Description Ger current user profile api
// @Accept json
// @Produce json
// @Success 200 {object} user.User
// @Failure 401 {string} string
// @Failure 404 {string} string
// @Failure 500 {string} string
// @Router /auth/me [get]
// @Security ApiKeyAuth
// @tags Auth
func Me(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(uint)
	if !ok {
		return ctx.Status(http.StatusInternalServerError).JSON("Internal error")
	}

	repo := ctx.Locals("UserRepo").(user.UserRepository)
	user, err := repo.FindOne(userId)
	if err != nil {
		if httpErr := common.IsHttpError(err); httpErr != nil {
			return ctx.Status(httpErr.Code).JSON(httpErr.Message)
		}

		return ctx.JSON(err.Error())
	}

	return ctx.JSON(user)
}
