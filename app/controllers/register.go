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
    "strconv"
    "time"
)

type Register struct {
    *revel.Controller
    revmgo.MongoController
}

func (c Register) Index() revel.Result {
    if c.Session["islogin"] == "true" {
        return c.Redirect(Home.Index)
    }
    return c.Render()

}

func (c Register) Register(user *models.User) revel.Result {
    user.Id = bson.NewObjectId()
    user.UserType = 2
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
        c.Session["userType"] = strconv.Itoa(user.UserType)
        revel.INFO.Println("register success")
        return c.RenderJson(&Result{"success", "register"})
    }
}
