CREATE TABLE IF NOT EXISTS users
(
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(30) NOT NULL ,
        email VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL ,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS users_update
  ON users;
CREATE TRIGGER users_update
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE updatedAt();