package project

import (
	"api/src/common"
	"database/sql"
)

func (r *ProjectSqlxRepo) FindOne(id uint) (*Project, error) {
	project := Project{}
	if err := r.db.Get(&project, "SELECT * FROM projects WHERE id = $1 LIMIT 1", id); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &project, nil
}
