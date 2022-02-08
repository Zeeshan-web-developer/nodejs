const express = require("express")
const router=express.Router()
// requiring controllers
const { getBootcampsByPagination,uploadImage } = require("../controllers/controllers")
router.route("/").get(getBootcampsByPagination).post(uploadImage)
module.exports=router



