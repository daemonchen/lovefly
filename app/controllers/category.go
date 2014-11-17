package controllers

import (
    // "encoding/json"
    // "fantastic/app/models"
    // "fmt"
    "github.com/jgraham909/revmgo"
    "github.com/revel/revel"
    // "labix.org/v2/mgo/bson"
    // "strconv"
    // "time"
)

type Category struct {
    *revel.Controller
    revmgo.MongoController
}

func (c Category) Index() revel.Result {
    controllerName := "list"
    return c.Render(controllerName)
}
