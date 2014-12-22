package controllers

import "github.com/revel/revel"

type Home struct {
    *revel.Controller
}

func (c Home) Index() revel.Result {
    controllerName := "home"
    username := c.Session["userName"]
    return c.Render(controllerName, username)
}
