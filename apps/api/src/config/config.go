package config

import (
	"github.com/ilyakaznacheev/cleanenv"
)

type TokenSecret struct {
	TokenSecret        string `env:"TOKEN_SECRET" env-default:"This is a super secret string for access token"`
	RefreshTokenSecret string `env:"REFRESH_TOKEN_SECRET" env-default:"This is a super secret string for refresh token"`
}

type Config struct {
	Database struct {
		Port     string `env:"DB_PORT" env-default:"5432"`
		Host     string `env:"DB_HOST" env-default:"localhost"`
		Name     string `env:"DB_NAME" env-default:"jira"`
		User     string `env:"DB_USER" env-default:"postgres"`
		Password string `env:"DB_PASSWORD" env-default:"postgres"`
	}
	Server struct {
		Host string `env:"HOST" env-default:""`
		Port string `env:"PORT" env-default:"3001"`
	}
	TokenSecret TokenSecret
}

func LoadEnv() (*Config, error) {
	cfg := Config{}
	if err := cleanenv.ReadEnv(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}
