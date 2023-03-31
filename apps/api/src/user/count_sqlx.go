package user

import (
	"api/src/common"

	"github.com/doug-martin/goqu/v9"
)

func (r *UserSqlxRepo) Count() (*uint, error) {
	var total uint
	query, _, _ := goqu.From("users").Select(goqu.COUNT("*")).ToSQL()

	if err := r.db.Get(&total, query); err != nil {
		return nil, common.InternalError
	}

	return &total, nil
}
