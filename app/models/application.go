package models

import (
    // "encoding/json"
    "fmt"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

type Application struct {
    Id             bson.ObjectId `bson:"_id,omitempty"`
    Name           string        `bson:"name"`
    Phone          string        `bson:"phone"`
    Email          string        `bson:"email"`
    Address        string        `bson:"address"`
    CourseType     string        `bson:"courseType"`
    Gender         string        `bson:"gender"`
    BornAddress    string        `bson:"bornAddress"`
    Birthday       string        `bson:"birthday"`
    EduBackground  string        `bson:"eduBackground"`
    Major          string        `bson:"major"`
    GraduationTime string        `bson:"graduationTime"`
    EnglishLevel   string        `bson:"englishLevel"`
    Tall           string        `bson:"tall"`
    Weight         string        `bson:"weight"`
    CaseHistory    string        `bson:"caseHistory"`
}

func getApplicationsCollection(s *mgo.Session) *mgo.Collection {
    return s.DB("lovefly").C("application")
}

func GetUserByEmail(s *mgo.Session, Email string) *Application {
    b := new(Application)
    getApplicationsCollection(s).Find(bson.M{"email": Email}).One(b)
    return b
}

func (b *Application) Save(s *mgo.Session) error {
    fmt.Println("start save application info")
    // fmt.Println(Collection(s))
    _, err := getApplicationsCollection(s).Upsert(bson.M{"phone": b.Phone}, b)
    return err
}
