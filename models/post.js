const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    address: String,
    phone: String
})

module.exports = mongoose.model('Posts', schema)