package project

import (
	"api/src/common"

	"github.com/lib/pq"
)

var insertQuery = `
	INSERT INTO projects 
	(
		name, description, category
	) 
	VALUES 
	(
		$1, $2, $3 
	) RETURNING id, name, description, category, created_at, updated_at
`

func (r *ProjectSqlxRepo) Insert(req WriteProjectBody) (*Project, error) {
	tx := r.db.MustBegin()
	var createdProject Project
	if err := tx.QueryRowx(insertQuery, req.Name, req.Description, req.Category).StructScan(&createdProject); err != nil {
		tx.Rollback()
		if err.(*pq.Error).Code == "23505" {
			return nil, &common.ErrDuplicate
		}

		return nil, &common.InternalError
	}

	if err := tx.Commit(); err != nil {
		return nil, &common.InternalError
	}

	return &createdProject, nil
}
