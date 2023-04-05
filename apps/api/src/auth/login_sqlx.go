package auth

import (
	"api/src/common"
	"api/src/user"
	"database/sql"
)

func (r *AuthSqlxRepo) Login(email string) (*user.User, error) {
	var user user.User
	if err := r.db.Get(&user, "SELECT * FROM users WHERE email = $1 LIMIT 1", email); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &user, nil
}
