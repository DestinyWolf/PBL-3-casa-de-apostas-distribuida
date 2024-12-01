package controller

import (
	"net/http"
	"tigrinho/model"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	
}

// para aplicar a modelagem de dados
func NewUserController() UserController {
	return UserController{}
}

func (p *UserController) GetUser(ctx *gin.Context) {
	users := []model.User{
		{ID: "123", Username: "John", Email: "john@example.com"},
		{ID: "123", Username: "Jane", Email: "jane@example.com"},
	}

	ctx.JSON(http.StatusOK, users)
}