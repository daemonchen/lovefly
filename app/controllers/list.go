package controllers

import (
    // "encoding/json"
    "lovefly/app/models"
    // "fmt"
    "github.com/jgraham909/revmgo"
    "github.com/revel/revel"
    // "labix.org/v2/mgo/bson"
    // "strconv"
    // "time"
)

type List struct {
    *revel.Controller
    revmgo.MongoController
}

var controllerNameMap = make(map[string]string)
//TODO: rework this code later
controllerNameMap[1] = "news";
controllerNameMap[2] = "project";
controllerNameMap[3] = "student";
func (c List) Index(categoryId int) revel.Result {
    controllerName := categoryId ? controllerNameMap[categoryId] : "news"
    return c.Render(controllerName)
}

func (c List) GetPostsList() revel.Result {
    controllerName := "news"
    return c.Render(controllerName)
}
