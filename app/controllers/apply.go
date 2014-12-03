package controllers

import (
    "encoding/json"
    "github.com/revel/revel"
    "github.com/revmgo"
    "lovefly/app/models"
)

type Apply struct {
    *revel.Controller
    revmgo.MongoController
}

func (c Apply) Index() revel.Result {
    controllerName := "student"
    return c.Render(controllerName)
}
func (c Apply) Save(application *models.Application) revel.Result {
    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&application)
    err := application.Save(c.MongoSession)
    if err != nil {
        panic(err)
        return c.RenderJson(&Result{"failed", "err"})
    } else {
        revel.INFO.Println("register success")
        return c.RenderJson(&Result{"success", "register"})
    }
}
