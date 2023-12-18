// Express CRUD Project :

const express = require("express")
const Coursesrouter = require("./routes/courses.routes")
const usersrouter = require("./routes/users.routes")
const httpStatusText = require("./utils/httpStatusText")
const cors = require("cors");
const path = require("path")
const PORT = process.env.PORT
const manageError = require("./utils/managingError")
const app = express();

app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(cors())





app.use("/api/course",Coursesrouter)
app.use("/api/users",usersrouter)

app.all("*",(req,res,next) => {
  res.json({status :httpStatusText.ERROR ,message : "Page Not Found",code : 404})
})

app.use((error,req,res,next) => {
  console.log(error)
  return res.json({
    message : error.message,
    code : error.code,
    status : error.status
  })
})

// LISTENING
app.listen(PORT,() => console.log(`http://localhost:${PORT}`))