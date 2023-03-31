package user

import (
	"api/src/common"

	"database/sql"

	"github.com/doug-martin/goqu/v9"
)

func (r *UserSqlxRepo) FindOne(id uint) (*UserResp, error) {
	var user UserResp
	query, _, _ := goqu.
		From("users").
		Select("id", "role", "avatar_url", "full_name", "email", "created_at", "updated_at").
		Limit(1).
		Where(goqu.C("id").Eq(id)).ToSQL()
	if err := r.db.Get(&user, query); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &user, nil
}
