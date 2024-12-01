package model

type User struct {
	ID       string `json:"id_user"`
	Username string `json:"nickname"`
	Email    string `json:"email"`
}