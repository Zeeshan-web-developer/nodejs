const express = require("express")
const router=express.Router()
// requiring controllers
const { getBootcampsByPagination } = require("./controllers")
router.route("/").get(getBootcampsByPagination)
module.exports=router



