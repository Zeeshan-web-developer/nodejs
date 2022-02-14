const path = require("path")
const express = require("express")
const app = express()

// requiring routes
const routes = require("./routes/routes")
const routes2 = require("./routes/routes2")
const routes3 = require("./routes/paginationroute")
const fileupload = require("express-fileupload");
const authRoute = require("./routes/authRoute")
const ErrorClass = require("./utils/ErrorClass")
const GlobalErrorHandler = require("./controllers/GlobalError")
// requiring middleware
const mongodb = require("./config/db")
// load the env variables
require("dotenv").config({ path: "./config/config.env" });
mongodb()
// Middleware
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileupload())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "hbs")
app.get("/forget-password", (req, res) => {
    res.render("ResetPassword")
})
app.use("/", routes) //jisbe route ko / aaraha hai toh routes ko use kana  hai
app.use("/api/v2", routes2) // jisbe route ko api/v2 se aa raha hai toh routes2 ko use krna hai
app.use("/api/v1/paginated", routes3)
app.use("/auth", authRoute)

// error handling Middelwares unhandled routes
app.all("*", (req, res, next) => {
    next(new ErrorClass("Page not found", 404));
});

app.use(GlobalErrorHandler)






app.listen(9000,()=>{console.log(`server started at port 9000 🧩`)})