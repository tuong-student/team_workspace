package project

import (
	"api/src/common"
	"database/sql"
)

var deleteQuery = `
    WITH deleted AS
    (
        DELETE FROM projects
        WHERE id = $1 
        RETURNING id, name, key, category, 
        icon_url, owner_id, created_at, updated_at
    )
    SELECT
    deleted.id, deleted.name, deleted.key, deleted.category,
    deleted.icon_url, deleted.owner_id, deleted.created_at, deleted.updated_at,
    users.id, users.avatar_url, users.full_name, users.email, users.role,
    users.created_at, users.updated_at
    FROM deleted
    INNER JOIN users
    ON deleted.owner_id = users.id
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
