const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema(
    {
        bookName: {
            type: String,
        },
         author: {
            type: String,
        
        },
          genre: {
            type: String,
        },
           price: {
            type: Number,
          
        },
      quantity: {
            type: Number,
          
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },

    

    }


)

module.exports = mongoose.model('Bootcamp', BootcampSchema);
