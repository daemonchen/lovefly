package controllers

import (
    "lovefly/app/models"
    // "fmt"
    "crypto/md5"
    "encoding/json"
    "fmt"
    "github.com/revel/revel"
    "github.com/revmgo"
    "gopkg.in/mgo.v2/bson"
    "time"
)

type Admin struct {
    *revel.Controller
    revmgo.MongoController
}

type Result struct {
    status string
    data   string
}

func (c Admin) Index() revel.Result {
    if c.Session["islogin"] == "true" {
        return c.Redirect(Edit.Index)
    }
    return c.Render()

}
func (c Admin) Logout() revel.Result {
    c.Session["islogin"] = "false"
    c.Session["userName"] = ""
    return c.Redirect(Admin.Index)
}
func (c Admin) Application() revel.Result {
    if c.Session["islogin"] != "true" {
        return c.Redirect(Admin.Index)
    }
    controllerName := "admin"
    username := c.Session["userName"]
    fmt.Println("username", username)
    return c.Render(controllerName, username)
}

func (c Admin) Login(username string, password string) revel.Result {
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

func (c Admin) Register(user *models.User) revel.Result {
    user.Id = bson.NewObjectId()
    user.UserType = 1
    user.Stamp = time.Now().UnixNano() / 1e6
    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&user)
    pwd := fmt.Sprintf("%x", md5.Sum([]byte(user.Password)))
    user.Password = pwd
    err := user.Save(c.MongoSession)
    if err != nil {
        panic(err)
        return c.RenderJson(&Result{"failed", "err"})
    } else {
        c.Session["islogin"] = "true"
        c.Session["userName"] = user.Username
        revel.INFO.Println("register success")
        return c.RenderJson(&Result{"success", "register"})
    }
}
