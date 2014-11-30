package controllers

import "github.com/revel/revel"

type Apply struct {
    *revel.Controller
}

func (c Apply) Index() revel.Result {
    controllerName := "student"
    return c.Render(controllerName)
}
