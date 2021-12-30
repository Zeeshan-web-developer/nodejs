const express = require("express")
const router=express.Router()
// requiring controllers
const { createBootcamp,getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,getBootcampByQuery,getBootcampByPost } = require("./controllers")
router.route("/").get(getBootcamps).post(createBootcamp)
router.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
module.exports=router



