const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    pizza: { 
        size: String,

        sauce: String,
    
        crust: String,
    
        cheese: [String],
    
        meat: [String],
    
        veg: [String]
    },

    price: Number,

    status: String,

    username: String
})

module.exports = mongoose.model('Order', orderSchema)