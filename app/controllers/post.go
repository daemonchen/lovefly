package controllers

import (
    // "encoding/json"
    "crypto/md5"
    "github.com/revel/revel"
    "github.com/revmgo"
    "lovefly/app/models"
    "lovefly/app/util"
    // "github.com/revel/revel/cache"
    "io"
    // "gopkg.in/mgo.v2/bson"
    "fmt"
    "math/rand"
    "strconv"
    "time"
)

type Post struct {
    *revel.Controller
    revmgo.MongoController
}

var CommentCache = make(map[string]string)

func (c *Post) generateSessionKey() []byte {
    md5Key := md5.New()
    io.WriteString(md5Key, "this is my first hash session key")
    return md5Key.Sum([]byte("daemonchen"))

}
func (c *Post) Index() revel.Result {
    controllerName := "home"
    isLogin := c.Session["islogin"]
    randNum := rand.Int63n(time.Now().Unix())
    hashKey := c.generateSessionKey()
    c.Session[string(hashKey[:])] = strconv.FormatInt(randNum, 10)
    CommentCache[strconv.FormatInt(randNum, 10)] = "true"
    fmt.Println("post---")
    return c.Render(controllerName, isLogin)

}
func (c *Post) GetPostByStamp(stamp string) revel.Result {
    post := models.GetPostByStamp(c.MongoSession, stamp)

    return c.RenderJson(post)

}
func (c *Post) Delete(stamp string) revel.Result {
    // controllerName := "home"
    if isLogin := c.Session["islogin"]; isLogin == "true" {
        err := models.DeletePost(c.MongoSession, stamp)
        if err != nil {
            panic(err)
        }
    }
    return c.RenderJson(&util.Message{"success update"})
}

func (c *Post) Update(stamp string, content string) revel.Result {
    revel.WARN.Println("commentData host:", c.Request.RemoteAddr)
    responseJson := &util.Message{"success delete"}
    err := models.UpdatePost(c.MongoSession, stamp, content)
    if err != nil {
        revel.WARN.Println("occur err when update:", err)
    }
    revel.WARN.Println("post updated success")
    return c.RenderJson(responseJson)
}

func (c *Post) clearCommentCacheValue() {
    hashKey := c.generateSessionKey()
    CommentCache[c.Session[string(hashKey[:])]] = "diff"
}
