package controllers

import "github.com/revel/revel"

type Home struct {
    *revel.Controller
}

func (c Home) Index() revel.Result {
    controllerName := "home"
    return c.Render(controllerName)
}
