//seeder file is used to seed the database with some data

const fs = require('fs');
const mongoose = require('mongoose');
//load the model
const Bootcamps = require("./models")
const Authors = require("./author_model")

//connect to the database
mongoose.connect("mongodb://localhost:27017/ApiCourse", {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
});
//read the json file
const data = JSON.parse(fs.readFileSync(`./data.json`, 'utf-8'));
const authors=JSON.parse(fs.readFileSync(`./authors.json`, 'utf-8'));
//import the data to the database
const importData = async () => {
    try {
        await Bootcamps.create(data);
        console.log("Data Imported");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
const importAuthors = async () => {
    try {
        await Authors.create(authors);
        console.log("Data Imported");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
//delete the data
const deleteData = async () => {
    try {
        await Bootcamps.deleteMany();
        console.log("Data Deleted");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
//check if there is any data in the database
const checkData = async () => {
    try {
        const count = await Bootcamps.countDocuments();
        console.log(count);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}
if (process.argv[2] === 'import') {
    importData();
}
if (process.argv[2] === 'delete') {
    deleteData();
}
if (process.argv[2] === 'check') {
    checkData();
}
if (process.argv[2] === 'ia') {
    importAuthors();
}