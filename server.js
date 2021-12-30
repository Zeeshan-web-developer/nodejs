const express = require("express")
const app = express()
// requring routes
const routes = require("./routes")
const routes2 = require("./routes2")
const routes3 = require("./paginationroute")
// requiring middleware
const logger = require("./middleware")
const mongodb = require("./db")
mongodb()
// Middleware
app.use(express.json())
app.use(logger)
app.use("/", routes) //jisbe route ko / aaraha hai toh routes ko use kana  hai
app.use("/api/v2", routes2) // jisbe route ko api/v2 se aa raha hai toh routes2 ko use krna hai
app.use("/api/v1/paginated", routes3)

app.listen(9000,()=>{console.log("server running on  9000")})