FROM golang:1.19-alpine AS builder

WORKDIR /build
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
COPY apps/api/go.mod apps/api/go.sum ./
RUN go mod download && \
    go install github.com/cosmtrek/air@latest && \
    go install github.com/swaggo/swag/cmd/swag

COPY apps/api/src ./src
COPY apps/api/main.go apps/api/.air.toml ./

RUN $GOPATH/bin/swag init && \
    go build -ldflags="-s -w" -o api .

FROM scratch
WORKDIR /usr/src/app

COPY apps/api/migrations ./migrations
COPY --from=builder ["/build/api", "/"]

ENTRYPOINT ["/api"]
