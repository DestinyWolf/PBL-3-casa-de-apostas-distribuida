package main

import (
	"tigrinho/controller"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	UserController := controller.NewUserController()

	server.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "pong"})
	})


	server.GET("/user", UserController.GetUser)
	server.Run(":8000")
}