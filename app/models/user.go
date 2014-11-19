package models

import (
    // "encoding/json"
    "fmt"
    "labix.org/v2/mgo"
    "labix.org/v2/mgo/bson"
)

type User struct {
    Id       bson.ObjectId `bson:"_id,omitempty"`
    Username string        `bson:"username"`
    Password string        `bson:"password"`
    UserType int           `bson:"userType"`
    // Stamp string        `bson:"stamp"`
}

func Collection(s *mgo.Session) *mgo.Collection {
    return s.DB("lovefly").C("user")
}

func GetUserByName(s *mgo.Session, Username string) *User {
    b := new(User)
    Collection(s).Find(bson.M{"username": Username}).One(b)
    return b
}

func (b *User) Save(s *mgo.Session) error {
    fmt.Println("start save user info")
    // fmt.Println(Collection(s))
    _, err := Collection(s).Upsert(bson.M{"_id": b.Id}, b)
    return err
}

func (b *User) Delete(s *mgo.Session) error {
    return Collection(s).RemoveId(b.Id)
}
