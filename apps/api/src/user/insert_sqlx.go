package user

import (
	"api/src/common"

	"github.com/lib/pq"
)

var insertQuery = `
	INSERT INTO users
	(
		name,email, password
	)
	VALUES
	(
		$1, $2, $3
	) RETURNING id, name, email, password, created_at, updated_at
`

func (r *UserSqlxRepo) Insert(req WriteUserBody) (*User, error) {
	var createdUser User
	if err := r.db.QueryRowx(insertQuery, req.Name, req.Email, req.Password).StructScan(&createdUser); err != nil {
		if ok := err.(*pq.Error).Code == "23505"; ok {
			return nil, &common.ErrDuplicate
		}

		return nil, common.InternalError
	}

	return &createdUser, nil
}
