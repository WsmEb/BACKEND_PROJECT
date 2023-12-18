
const {MongoClient} = require("mongodb")

const url = "mongodb+srv://wassim123456:wassim123456@cluster0.yrqzmb6.mongodb.net/?retryWrites=true&w=majority"

const Client = new MongoClient(url)


const manageDB = async () => {

  const connection = await Client.connect();

  if(connection) {
    console.log("Connection Succefuly")
    const CoursesDb = Client.db("Courses");
    const CourseCollection = CoursesDb.collection("CourseCollections");
  
    const findCourses =  await CourseCollection.find({},{projection : {price : 1,_id : 0}}).toArray()

     findCourses && console.log(findCourses)
  
  } else {
    console.log("Connection Error : ")
  }


}
manageDB()