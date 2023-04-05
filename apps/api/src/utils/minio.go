package utils

import (
	"api/src/config"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

func ConnectMinio(minioConfigs config.MinioSecret) (*minio.Client, error) {
	minioClient, err := minio.New(minioConfigs.Endpoint, &minio.Options{
		Creds: credentials.NewStaticV4(minioConfigs.User, minioConfigs.Password, ""),
	})
	if err != nil {
		return nil, err
	}

	return minioClient, err
}
