package admin

type InitResp struct {
	HasAdmin bool `json:"hasAdmin"`
}

type WriteAdminBody struct {
	FullName string `validate:"required,min=8,max=30" db:"full_name"`
	Email    string `validate:"required,email,max=30" db:"email"`
	Password string `validate:"min=8,max=32"`
}
