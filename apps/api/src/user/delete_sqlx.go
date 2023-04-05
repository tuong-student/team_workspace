package user

import (
	"api/src/common"
	"database/sql"
)

var deleteQuery = `
	DELETE FROM users WHERE id = $1 
    RETURNING id, avatar_url, role, full_name, email, created_at, updated_at
`

func (r *UserSqlxRepo) Delete(id uint) (*User, error) {
	var deletedUser User
	if err := r.db.QueryRowx(deleteQuery, id).StructScan(&deletedUser); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &deletedUser, nil
}
