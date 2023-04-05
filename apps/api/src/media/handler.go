package media

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/minio/minio-go/v7"
)

type UploadMediaResp struct {
	ObjectName string `json:"objectName"`
}

// @UploadMedia godoc
// @Summary Post file to server
// @Produce json
// @Accept multipart/form-data
// @Param fileUpload formData file true "Upload file"
// @Success 200 {string} string
// @Router /media/upload [post]
// @Security ApiKeyAuth
// @Tags Media
func UploadMedia(c *fiber.Ctx) error {
	ctx := context.Background()
	minioClient := c.Locals("minioClient").(*minio.Client)
	bucket := c.Locals("minioBucket").(string)
	file, err := c.FormFile("fileUpload")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}

	buffer, err := file.Open()
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	defer buffer.Close()

	fileName := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
	fileBuffer := buffer
	contentType := file.Header["Content-Type"][0]
	fileSize := file.Size

	_, err = minioClient.PutObject(ctx, bucket, fileName, fileBuffer, fileSize, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(UploadMediaResp{ObjectName: fileName})
}

// @GetMedia godoc
// @Summary Get media files
// @Param objectName path string true "Object name"
// @Produce png
// @Success 200 {string} string
// @Failure 500 {string} string "Internal error"
// @Router /media/{objectName} [get]
// @Tags Media
func GetMedia(c *fiber.Ctx) error {
	ctx := context.Background()
	objectName := c.Params("objectName")
	minioClient := c.Locals("minioClient").(*minio.Client)
	bucket := c.Locals("minioBucket").(string)

	newObject, err := minioClient.GetObject(ctx, bucket, objectName, minio.GetObjectOptions{})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Can not get Image")
	}

	c.Set("Content-Type", "image/png")
	return c.SendStream(newObject)
}
