const Bootcamp = require("./models")
const Author = require("./author_model");

// TODO {{BaseUrl}}/61aa1d53f59b62a17cd9f261 this is we can acces by req.params.id
// TODO {{BaseUrl}}/?id=123 this id we can acces req.query.


// get all bootcamps whose price is   greater than,or less than or equal to the given price




// @desc get all bootcamps 
exports.getBootcamps = async (req, res) => {
console.log("get all bootcamps")
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success:true,data:bootcamps})
    res.end()
}
// @desc create a new bootcamp


// @desc get a sing
exports.getBootcamp = async (req, res) => {
      console.log("get a single bootcamp by params")
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    console.log(req.params.id)
    res.end()
}
//update a bootcamp 
exports.updateBootcamp = async (req, res) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    res.end()
}
// delete a bootcamp
exports.deleteBootcamp = async (req, res) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: {} });
    res.end()
}

// create a bootcamp
exports.createBootcamp = async (req, res) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
    res.end()
}
// get a single bootcamp using query params
exports.getBootcampByQuery = async (req, res) => {
    console.log("get a single bootcamp by request query",req.query)
    const bootcamp = await Bootcamp.findOne(req.query);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    res.end()
}

// get a single bootcamp by using post request
exports.getBootcampByPost = async (req, res) => {
    console.log("get a single bootcamp by request post",req.body)
    const bootcamp = await Bootcamp.findOne(req.body);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    res.end()
}

// get bootcamps based on relational operators
exports.getBoortcampsByRelationalOperators = async (req, res) => {
    console.log("get bootcamps based on relational operators")
    let queryString = JSON.stringify(req.query)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|eq|in)\b/g, match => `$${match}`)
    queryString = JSON.parse(queryString);
    const bootcamps = await Bootcamp.find(queryString);
    if (!bootcamps) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamps });
    res.end()
}
// get bootcamps based on page range

// Example of first first pagination route
exports.getBootcampsByPagination = async (req, res) => {
    console.log("This pagination route give us data each page 2 records and we if dont pass page Number then bydefalt it will take one")
    const pageNo = parseInt(req.query.page || 1); // if page is not given then it will take 1
    const perPage = parseInt(req.query.pageSize||2); // number of records per page
    const limit   = parseInt(perPage);
    const bootcamps = await Bootcamp.find()
        .skip((perPage * pageNo) - perPage) // skip the number of records
        .limit(perPage); // limit the number of records
    const startIndex = (pageNo - 1) * limit;
    const endIndex = pageNo * limit;
    const total = await Bootcamp.countDocuments();
    const pagination = {}
    // if we are on ist page then we will not have previous page
    if (startIndex > 0) pagination.prev = {
        pageNo: pageNo - 1,
        limit: limit
    }
    // if we are on last page then we will not have next page
    if (endIndex < total) pagination.next = {
        pageNo: pageNo + 1,
        limit: limit
    }
    
    res.status(200).json({
        success: true, data: bootcamps,
        pagination: pagination,
       count:bootcamps.length
    });
   
    res.end()
}
exports.geBooks = async (req, res, next) => {
    const courses = await Bootcamp.find({ author: req.query.authorId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  
};