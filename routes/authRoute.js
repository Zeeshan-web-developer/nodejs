const express = require("express")
const router=express.Router()
// requiring controllers
const { login, getMe } = require("../controllers/controllers")
const { protected} = require("../middlewares/middleware")

router.route("/login").post(login)
router.route("/getme").get(protected,getMe)
module.exports=router



