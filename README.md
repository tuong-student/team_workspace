# Turborepo starter

[![CI workflows](https://github.com/tuong-student/team_workspace/actions/workflows/ci.yml/badge.svg)](https://github.com/tuong-student/team_workspace/actions/workflows/ci.yml)
[![CD workflows](https://github.com/tuong-student/team_workspace/actions/workflows/cd.yml/badge.svg)](https://github.com/tuong-student/team_workspace/actions/workflows/cd.yml)
[![golangci-lint](https://github.com/tuong-student/team_workspace/actions/workflows/golangci-lint.yml/badge.svg)](https://github.com/tuong-student/team_workspace/actions/workflows/golangci-lint.yml)

This is an official pnpm starter turborepo. The monorepo contains frontend, cms written in [VueJS](https://vuejs.org) and api written in [Go](https://go.dev/)

## Prerequisite

Because of the mix with typescript and golang, you will need to install go dependencies if you wish to run the api code.

And of course, please install [NodeJs](https://nodejs.dev/) and [Golang](https://go.dev/) locally for development.

### Set GOPATH to use go binary

Running this command will set your environtment path with $GOPATH/bin so you can use golang binary commands

```sh
echo 'export PATH=$(go env GOPATH)/bin:$PATH' >> ~/.zshrc # (or .bashrc)
```

### Swaggo

Install swaggo with the below installation command [from fiber swagger repo](https://github.com/gofiber/swagger)

```sh
go get -u github.com/swaggo/swag/cmd/swag
# 1.16 or newer
go install github.com/swaggo/swag/cmd/swag@latest

swag -v
```

### Golang-migrate

This cli is use for generate migration files, which will create and delete database's tables. You can checkout how to install [here](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate)

This is brief command to install the package with go toolchain:

```sh
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@lates
```

[Usage reference](https://www.freecodecamp.org/news/database-migration-golang-migrate/)

### Golanglint-ci

To install Golanglint-ci, run the command from golanglint-ci installation guide. If you wish to install with other methods, you can checkout [the documentation](https://golangci-lint.run/usage/install/)

```sh
# binary will be $(go env GOPATH)/bin/golangci-lint
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.50.1

golangci-lint --version
```

After this, you are good to contribute to the golang repository

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by `web` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

Ensure to run migration up script before first time running `air` command. Migration up script:

```sh
migrate -path migrations/ -database "postgresql://postgres:postgres@localhost:5432/jira?sslmode=disable" -verbose up
```

Migration down script:

```sh
migrate -path migrations/ -database "postgresql://postgres:postgres@localhost:5432/jira?sslmode=disable" -verbose up
```

To develop all apps and packages, run the following command:

```sh
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
