package auth

type LoginBody struct {
	Email    string `validate:"required,email,max=30" db:"email" json:"email"`
	Password string `validate:"min=8,max=32" json:"password"`
}

type LoginResp struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type RefreshTokenBody struct {
	RefreshToken string `json:"refreshToken" validate:"required,jwt"`
}
