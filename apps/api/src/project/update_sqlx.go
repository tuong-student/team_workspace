package project

import (
	"api/src/common"
	"database/sql"
	"fmt"

	"github.com/lib/pq"
)

var updateQuery = `
    WITH updated AS
    (
        UPDATE projects
        SET name = $2, key = $3, category = $4, icon_url = $5
        WHERE id = $1
        RETURNING id, name, key, category, icon_url,
        owner_id, created_at, updated_at
    )
    SELECT
    updated.id, updated.name, updated.key, updated.category,
    updated.icon_url, updated.owner_id, updated.created_at, updated.updated_at,
    users.id, users.avatar_url, users.full_name, users.email, users.role,
    users.created_at, users.updated_at
    FROM updated
    INNER JOIN users
    ON updated.owner_id = users.id
`

func (r *ProjectSqlxRepo) Update(id uint, req UpdateProjectBody) (*Project, error) {
	var updatedProject Project
	if err := r.db.QueryRowx(updateQuery, id, req.Name, req.Key, req.Category, req.IconUrl).StructScan(&updatedProject); err != nil {
		fmt.Println(err)
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
