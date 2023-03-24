package main

import (
	_ "api/docs"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"

	"api/src/config"
	"api/src/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	"github.com/jmoiron/sqlx"
)

func HealthCheck(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

// @title Fiber Jira API
// @version 1.0.0
// @description This is jira api swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @BasePath /api/v1
func main() {
	config, e := config.LoadEnv()
	if e != nil {
		log.Fatal(e)
	}
	DB_DNS := utils.GetDbURI(config)
	db, err := sqlx.Connect("postgres", DB_DNS)
	if err != nil {
		log.Fatalln(err)
	}
	driver, err := postgres.WithInstance(db.DB, &postgres.Config{})
	m, err := migrate.NewWithDatabaseInstance(
		"file:///migrations",
		"postgres", driver)
	m.Up()

	tx := db.MustBegin()
	tx.MustExec("SELECT 1;")
	if err := tx.Commit(); err != nil {
		panic("oh no")
	}

	serverAddr := utils.GetServerAddress(config)

	app := fiber.New()
	api := app.Group("/api")
	_ = api.Group("/v1")

	app.Use(cors.New())
	app.Use(func(c *fiber.Ctx) error {
		return c.Next()
	})
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip}  ${status} - ${latency} ${method} ${path}\n",
	}))
	app.Get("/metrics", monitor.New(monitor.Config{Title: "MyService Metrics Page"}))
	app.Use(compress.New())
	app.Use(etag.New())
	app.Use(favicon.New())

	app.Get("/healthz", HealthCheck)
	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Redirect("/docs")
	})

	go func() {
		if appErr := app.Listen(serverAddr); appErr != nil {
			log.Panic(appErr)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM) // When an interrupt or termination signal is sent, notify the channel

	<-c // This blocks the main thread until an interrupt is received
	fmt.Println("Gracefully shutting down...")
	_ = app.Shutdown()

	fmt.Println("Running cleanup tasks...")

	// Your cleanup tasks go here
	// db.Close()
	// redisConn.Close()
	fmt.Println("Fiber was successful shutdown.")
}
