package project

import (
	"api/src/common"

	"github.com/lib/pq"
)

var insertQuery = `
    WITH inserted AS
    (
        INSERT INTO projects 
        (
            name, key, category, owner_id, icon_url
        ) 
        VALUES 
        (
            $1, $2, $3, $4, $5
        ) RETURNING id, name, key, category, icon_url, owner_id, created_at, updated_at
    )
    SELECT
    inserted.id, inserted.name, inserted.key, inserted.category,
    inserted.icon_url, inserted.owner_id, inserted.created_at, inserted.updated_at,
    users.id, users.avatar_url, users.full_name, users.email, users.role,
    users.created_at, users.updated_at
    FROM inserted
    INNER JOIN users
    ON inserted.owner_id = users.id
`

func (r *ProjectSqlxRepo) Insert(req WriteProjectBody) (*Project, error) {
	var createdProject Project
	iconUrl := "https://api.dicebear.com/6.x/icons/svg?seed=" + req.Name
	if err := r.db.QueryRowx(insertQuery, req.Name, req.Key, req.Category, req.OwnerId, iconUrl).StructScan(&createdProject); err != nil {
		if ok := err.(*pq.Error).Code == "23505"; ok {
			return nil, common.ErrDuplicate
		}

		return nil, common.InternalError
	}

	return &createdProject, nil
}
