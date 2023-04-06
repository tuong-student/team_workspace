package project

import (
	"api/src/common"
	"database/sql"
)

var findDetailsQuery = `
SELECT projects.id, projects.name, projects.key, projects.category, projects.icon_url,
projects.owner_id, projects.created_at, projects.updated_at, 
users.id, users.avatar_url, users.full_name, users.email, users.role,
users.created_at, users.updated_at

FROM projects, users

WHERE projects.owner_id = users.id AND projects.id = $1 
LIMIT 1
`

func (r *ProjectSqlxRepo) FindOne(id uint) (*Project, error) {
	project := Project{}
	if err := r.db.Get(&project, findDetailsQuery, id); err != nil {
		if err == sql.ErrNoRows {
			return nil, common.ErrNotFound
		}
		return nil, common.InternalError
	}

	return &project, nil
}
