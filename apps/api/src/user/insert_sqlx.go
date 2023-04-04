package user

import (
	"api/src/common"

	"github.com/lib/pq"
)

var insertQuery = `
	INSERT INTO users
	(
		full_name, email, password, avatar_url, role
	)
	VALUES
	(
		$1, $2, $3, $4, $5
	) RETURNING id, avatar_url, full_name, email, role, created_at, updated_at
`

func (r *UserSqlxRepo) Insert(req WriteUserBody) (*User, error) {
	var createdUser User
	if err := r.db.QueryRowx(
		insertQuery,
		req.FullName,
		req.Email,
		req.Password,
		"https://api.dicebear.com/6.x/initials/svg?seed="+req.FullName,
		req.Role,
	).
		StructScan(&createdUser); err != nil {
		if ok := err.(*pq.Error).Code == "23505"; ok {
			return nil, common.ErrDuplicate
		}

		return nil, common.InternalError
	}

	return &createdUser, nil
}
