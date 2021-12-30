const logger = (req,res,next) => {
    console.log("Api request received")
    next()
}
module.exports=logger