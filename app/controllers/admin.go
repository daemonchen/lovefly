package controllers

import (
    "lovefly/app/models"
    // "fmt"
    "crypto/md5"
    "encoding/json"
    "fmt"
    "github.com/jgraham909/revmgo"
    "github.com/revel/revel"
    "labix.org/v2/mgo/bson"
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
    return c.Render()

}

func (c Admin) Login(username string, password string) revel.Result {
    responseJson := &Result{}
    user := models.GetUserByName(c.MongoSession, username)
    if password == user.Password {
        c.Response.Status = 200
        c.Session["islogin"] = "true"
        return c.RenderJson(responseJson)
    } else {
        responseJson = &Result{"caicaikana", "login failed"}
        c.Response.Status = 403
        c.Session["islogin"] = "false"
        return c.RenderJson(responseJson)

    }
}

func (c Admin) Register(user *models.User) revel.Result {
    user.Id = bson.NewObjectId()
    user.UserType = 1
    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&user)
    fmt.Println("-------user:", user, c.Request.Body)
    pwd := fmt.Sprintf("%x", md5.Sum([]byte(user.Password)))
    fmt.Println("-------pwd:", pwd)
    // user := &models.User{bson.NewObjectId(), username, pwd, 1}
    err := user.Save(c.MongoSession)
    if err != nil {
        panic(err)
        return c.RenderJson(&Result{"failed", "err"})
    } else {
        revel.INFO.Println("register success")
        return c.RenderJson(&Result{"success", "register"})
    }
}
