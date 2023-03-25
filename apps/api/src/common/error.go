package common

import "net/http"

type HttpError struct {
	Message string
	Code    int
}

var ErrUnauthorized = HttpError{
	Message: "Unauthorized.",
	Code:    http.StatusUnauthorized,
}

var ErrNotFound = HttpError{
	Message: "Not found.",
	Code:    http.StatusNotFound,
}

var ErrDuplicate = HttpError{
	Message: "Unique constraint error",
	Code:    http.StatusConflict,
}

var InternalError = HttpError{
	Message: "Internal server error.",
	Code:    http.StatusInternalServerError,
}

func (e HttpError) Error() string {
	return e.Message
}
