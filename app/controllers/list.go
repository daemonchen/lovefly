package controllers

import (
    // "encoding/json"
    // "lovefly/app/models"
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

func (c List) Index() revel.Result {
    controllerName := "list"
    return c.Render(controllerName)
}
