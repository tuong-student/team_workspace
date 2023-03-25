package project

import (
	"api/src/common"
	"database/sql"
)

var deleteQuery = `
	DELETE FROM projects WHERE id = $1 RETURNING *
`

func (r *ProjectSqlxRepo) Delete(id uint) (*Project, error) {
	var deletedProject Project
	if err := r.db.QueryRowx(deleteQuery, id).StructScan(&deletedProject); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &deletedProject, nil
}
