const mongoose  = require('mongoose');
const Author_schema = new mongoose.Schema({
    name:{
        type:String,
    },
    book :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bootcamp'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('AuthorSchema',Author_schema);