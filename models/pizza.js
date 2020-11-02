const mongoose = require('mongoose')

const pizzaSchema = mongoose.Schema({
    size: String,

    sauce: String,

    crust: String,

    cheese: [String],

    meat: [String],

    veg: [String]
})

module.exports = mongoose.model('Pizza', pizzaSchema)