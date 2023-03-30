package project

import (
	"api/src/common"
	"database/sql"

	"github.com/lib/pq"
)

var updateQuery = `
    UPDATE projects
    SET name = $2, description = $3, category = $4
    WHERE id = $1
    RETURNING *
`

func (r *ProjectSqlxRepo) Update(id uint, req WriteProjectBody) (*Project, error) {
	var updatedProject Project
	if err := r.db.QueryRowx(updateQuery, id, req.Name, req.Description, req.Category).StructScan(&updatedProject); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}

		if ok := err.(*pq.Error).Code == "23505"; ok {
			return nil, common.ErrDuplicate
		}

		return nil, common.InternalError
	}

	return &updatedProject, nil
}
