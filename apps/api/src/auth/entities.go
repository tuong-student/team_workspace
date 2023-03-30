package auth

type LoginBody struct {
	Email    string `validate:"required,email,max=30" db:"email"`
	Password string `validate:"min=8,max=32"`
}

type LoginResp struct {
	AccessToken  string `js:"accessToken"`
	RefreshToken string `js:"refreshToken"`
}
