package controllers

import (
    // "encoding/json"
    "lovefly/app/models"
    // "fmt"
    // "fmt"
    "github.com/revel/revel"
    "github.com/revmgo"
    // "gopkg.in/mgo.v2/bson"
    // "strconv"
    // "time"
)

type List struct {
    *revel.Controller
    revmgo.MongoController
}

//TODO: rework this code later
// func (c List) Index(categoryId int) revel.Result {
func (c List) Index() revel.Result {
    // controllerNameMap := map[int]string{
    //     1:  "news",
    //     2:  "project",
    //     3:  "student",
    //     4:  "club",
    //     5:  "about"}
    // controllerName := "news"
    // if categoryId > 0 {
    //     controllerName = controllerNameMap[categoryId]
    // }
    return c.Render()
}

func (c List) GetPostsList(categoryId int, subCategoryId int) revel.Result {
    list := models.GetPostsList(c.MongoSession, categoryId, subCategoryId)
    // fmt.Println("list", list)
    return c.RenderJson(list)
}
