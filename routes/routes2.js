const express = require("express")
const router=express.Router()
// requiring controllers
const {getBootcampByQuery ,getBootcampByPost,getBootcampsByRelationalOperators,geBooks} = require("../controllers/controllers")

//router.route("/").get(getBootcampsByRelationalOperators)
//router.route("/").get(getBootcampByQuery).post(getBootcampByPost)
router.route("/").get(geBooks)
module.exports=router



