package user

import (
	"api/src/common"
	"database/sql"

	"github.com/lib/pq"
)

var updateQuery = `
    UPDATE users
    SET full_name = $2, avatar_url = $3
    WHERE id = $1
    RETURNING id, avatar_url, full_name, email, created_at, updated_at
`

func (r *UserSqlxRepo) Update(id uint, req UpdateUserBody) (*UserResp, error) {
	var updatedUser UserResp
	if err := r.db.QueryRowx(updateQuery, id, req.FullName, req.AvatarUrl).StructScan(&updatedUser); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}

		if ok := err.(*pq.Error).Code == "23505"; ok {
			return nil, common.ErrDuplicate
		}

		return nil, common.InternalError
	}

	return &updatedUser, nil
}
