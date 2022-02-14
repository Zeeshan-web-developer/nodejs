const path = require('path');
const bcrypt = require('bcryptjs');
const USER = require("../models/models")

// TODO {{BaseUrl}}/61aa1d53f59b62a17cd9f261 this is we can acces by req.params.id
// TODO {{BaseUrl}}/?id=123 this id we can acces req.query.

// @desc get all bootcamps if No query params
//path: http://localhost:9000 or http://localhost:9000?page=1&pageSize=2

exports.getBootcamps = async (req, res) => {
    const pageNo = parseInt(req.query.page || 1); 
    let perPage = parseInt(req.query.pageSize); 
    !perPage ? perPage = await USER.countDocuments() : perPage = perPage;
    const limit   = parseInt(perPage);
    const boot = await USER.find()
        .skip((perPage * pageNo) - perPage) 
        .limit(perPage); 
    const startIndex = (pageNo - 1) * limit;
    const endIndex = pageNo * limit;
    const total = await USER.countDocuments();
    const pagination = {}
    if (startIndex > 0) pagination.prev = {
        pageNo: pageNo - 1,
        limit: limit
    }
    if (endIndex < total) pagination.next = {
        pageNo: pageNo + 1,
        limit: limit
    }
    
    res.status(200).json({
        success: true, data: boot,
         pagination: pagination,
       count:boot.length
    });
   
    res.end()
}

// @desc get a sing
exports.getBootcamp = async (req, res) => {
      console.log("get a single bootcamp by params")
    const bootcamp = await USER.findById(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    console.log(req.params.id)
    res.end()
}
//update a bootcamp 
exports.updateBootcamp = async (req, res) => {
    console.log("update a single bootcamp by params")
    const bootcamp = await USER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    console.log(req.params.id)
    res.end()
}

// delete a bootcamp
exports.deleteBootcamp = async (req, res) => {
    const bootcamp = await USER.findByIdAndDelete(req.params.id);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: {} });
    res.end()
}

// create a bootcamp
exports.createBootcamp = async (req, res) => {
    const bootcamp = await USER.create(req.body);
    // create a token
    const token = bootcamp.getSignedJwtToken();
    res.status(200).json({ success: true, data: bootcamp,token:token });
    res.end()
}
// get a single bootcamp using query params
exports.getBootcampByQuery = async (req, res) => {
    console.log("get a single bootcamp by request query",req.query)
    const bootcamp = await USER.findOne(req.query);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    res.status(200).json({ success: true, data: bootcamp });
    res.end()
}

// get a single bootcamp by using post request
exports.getBootcampByPost = async (req, res) => {
    console.log("get a single bootcamp by request post",req.body)
    const bootcamp = await USER.findOne(req.body);
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
    const bootcamps = await USER.find(queryString);
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
    const total = await USER.countDocuments();
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
    const courses = await USER.find({ author: req.query.authorId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  
};

// @desc upload image
// @route POST /api/v1/paginated
// upload image
exports.uploadImage = async (req, res) => {
    const bootcamp = await USER.findById(req.body.id);
    if (!bootcamp) return res.status(400).json({ success: false, error: 'Bootcamp not found' });
    if (!req.files) return res.status(400).json({ success: false, error: 'No file uploaded' });
    if (!req.files.pic) return res.status(400).json({ success: false, error: 'Please upload a file' });
    const file = req.files.pic;
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return res.status(400).json({ success: false, error: 'Please upload an image' });
    }
    // Check filesize
    // if (file.size > process.env.MAX_FILE_UPLOAD) {
    //     return res.status(400).json({ success: false, error: 'File too large. Max file size is ' + process.env.MAX_FILE_UPLOAD + ' bytes' });
    // }
    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    console.log(file.name)
    console.log(path.parse(file.name).ext)
    console.log(path.parse(file.name).name)
    console.log(path.parse(file.name).base)
    console.log(path.parse(file.name).ext)
    // Upload image
    file.mv(`./public/uploads/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, error: err });
        }
        await USER.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({ success: true, data: file.name });
    });
}

//   login user
exports.login = async (req, res) => {
    console.log("login user")
    const { email, password } = req.body;
    // Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please enter email and password' });
    }
    // // Check for existing user
    const user = await USER.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ success: false, error: 'User not found' });
    // // // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Incorrect email or password' });
    // // // Send token back
   const token= await user.getSignedJwtToken();

    // Return jsonwebtoken
     res.status(200).json({ success: true,token:token });
}

// get logged in user
exports.getMe = async (req, res) => {
    console.log("get logged in user")
    const user = await USER.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
}

