package user

import (
	"api/src/common"
	"api/src/utils"
	"strings"

	"github.com/doug-martin/goqu/v9"
)

func (r *UserSqlxRepo) Find(query UserQuery) (*common.BasePaginationResponse[User], error) {
	users := []*User{}
	res := &common.BasePaginationResponse[User]{}
	queryBuilder := common.
		Pagination("users", &query.BaseQuery, res).
		Select(
			"id", "avatar_url", "full_name", "email", "role", "created_at", "updated_at",
		)

	countQueryBuilder := goqu.From("users").
		Select(goqu.COUNT("*"))

	if query.Q != nil {
		search := utils.EscapeLike("%", "%", strings.ToLower(*query.Q))
		whereExpression := goqu.Or(
			goqu.I("full_name").ILike(search),
			goqu.I("email").ILike(search),
		)
		queryBuilder = queryBuilder.Where(whereExpression)
		countQueryBuilder = countQueryBuilder.Where(whereExpression)
	}

	countSQL, _, _ := countQueryBuilder.ToSQL()
	var total uint
	if err := r.db.Get(&total, countSQL); err != nil {
		return nil, common.InternalError
	}
	res.Total = total

	sql, _, _ := queryBuilder.ToSQL()
	if err := r.db.Select(&users, sql); err != nil {
		return nil, common.InternalError
	}
	res.Items = users

	return res, nil
}
