package user

import (
	"api/src/common"
	"api/src/utils"
	"strings"

	"github.com/doug-martin/goqu/v9"
)

func (r *UserSqlxRepo) Find(query UserQuery) (*common.BasePaginationResponse[UserResp], error) {
	users := []*UserResp{}
	res := &common.BasePaginationResponse[UserResp]{}
	queryBuilder := common.
		Pagination("users", &query.BaseQuery, res).
		Select(
			"id", "avatar_url", "full_name", "email", "role", "created_at", "updated_at",
		).
		Where(goqu.C("role").Eq("user"))

	countQueryBuilder := goqu.From("users").
		Select(goqu.COUNT("*")).
		Where(goqu.C("role").Eq("user"))

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
