package project

import (
	"api/src/common"
	"api/src/utils"
	"strings"

	"github.com/doug-martin/goqu/v9"
)

func (r *ProjectSqlxRepo) Find(query ProjectQuery) (*common.BasePaginationResponse[Project], error) {
	var projects []*Project
	res := &common.BasePaginationResponse[Project]{}
	queryBuilder := common.Pagination("projects", &query.BaseQuery, res)
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
	if err := r.db.Select(&projects, sql); err != nil {
		return nil, common.InternalError
	}
	res.Items = projects

	return res, nil
}
