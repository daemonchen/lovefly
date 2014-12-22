package controllers

import (
    "lovefly/app/models"
    // "fmt"
    // "crypto/md5"
    // "encoding/json"
    "fmt"
    "github.com/revel/revel"
    "github.com/revmgo"
    // "gopkg.in/mgo.v2/bson"
)

type Login struct {
    *revel.Controller
    revmgo.MongoController
}

func (c Login) Index() revel.Result {
    if c.Session["islogin"] == "true" {
        return c.Redirect(Home.Index)
    }
    return c.Render()

}
func (c Login) Logout() revel.Result {
    c.Session["islogin"] = "false"
    c.Session["userName"] = ""
    return c.Redirect(Home.Index)
}

func (c Login) Login(username string, password string) revel.Result {
    responseJson := &Result{}
    user := models.GetUserByName(c.MongoSession, username)
    fmt.Println(username)
    if password == user.Password {
        c.Response.Status = 200
        c.Session["islogin"] = "true"
        fmt.Println("username---", user.Username)
        c.Session["userName"] = user.Username
        return c.RenderJson(responseJson)
    } else {
        responseJson = &Result{"caicaikana", "login failed"}
        c.Response.Status = 403
        c.Session["islogin"] = "false"
        c.Session["userName"] = ""
        return c.RenderJson(responseJson)

    }
}
