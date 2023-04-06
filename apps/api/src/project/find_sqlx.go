package project

import (
	"api/src/common"
	"api/src/utils"
	"fmt"
	"strings"

	"github.com/doug-martin/goqu/v9"
)

func (r *ProjectSqlxRepo) Find(query ProjectQuery) (*common.BasePaginationResponse[Project], error) {
	projects := []*Project{}
	res := &common.BasePaginationResponse[Project]{}
	queryBuilder := common.
		Pagination("projects", &query.BaseQuery, res).
		Select(
			goqu.I("projects.id").As("id"), goqu.I("projects.name").As("name"),
			goqu.I("projects.key").As("key"),
			"projects.category", "projects.icon_url", "projects.owner_id",
			"projects.created_at", "projects.updated_at",
			"users.id", "users.avatar_url", "users.full_name",
			"users.email", "users.role",
			"users.created_at", "users.updated_at",
		).
		InnerJoin(
			goqu.T("users"),
			goqu.On(
				goqu.Ex{"projects.owner_id": goqu.I("users.id")},
			),
		)
	countQueryBuilder := goqu.From("projects").Select(goqu.COUNT("*"))

	if query.Q != nil {
		search := utils.EscapeLike("%", "%", strings.ToLower(*query.Q))
		whereExpression := goqu.Or(
			goqu.I("name").ILike(search),
			goqu.I("description").ILike(search),
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
	fmt.Println("DEBUG SQL: ", sql)
	if err := r.db.Select(&projects, sql); err != nil {
		fmt.Println("DEBUG: ", err)
		return nil, common.InternalError
	}
	res.Items = projects

	return res, nil
}
