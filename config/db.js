
const mongoose = require("mongoose")
const db = "mongodb://localhost:27017/ApiCourse";
const mongoDb =async () => {
    const conn = await mongoose.connect(db, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology:true
    })
    console.log("Mongodb connected")
}
module.exports = mongoDb







