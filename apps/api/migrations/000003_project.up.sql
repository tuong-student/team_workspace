CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(500) DEFAULT NULL,
        category VARCHAR(20) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS projects_update
  ON projects;
CREATE TRIGGER projects_update
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE updatedAt();