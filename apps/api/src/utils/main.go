package utils

import (
	"api/src/config"
	"fmt"
	"strings"
)

func GetDbURI(cfg *config.Config) string {
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", cfg.Database.Host, cfg.Database.User, cfg.Database.Password, cfg.Database.Name, cfg.Database.Port)
}

func GetServerAddress(cfg *config.Config) string {
	return fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port)
}

func GetDataTypeAddress[T any](data T) *T {
	return &data
}

func EscapeLike(left, right, word string) string {
	var n int
	for i := range word {
		if c := word[i]; c == '%' || c == '_' || c == '\\' {
			n++
		}
	}
	// No characters to escape.
	if n == 0 {
		return left + word + right
	}
	var b strings.Builder
	b.Grow(len(word) + n)
	for _, c := range word {
		if c == '%' || c == '_' || c == '\\' {
			b.WriteByte('\\')
		}
		b.WriteRune(c)
	}
	return left + b.String() + right
}
