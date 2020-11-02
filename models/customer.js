const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    streetAddress: String,
    city: String,
    postCode: String,
    phone: String,
    email: String
})

module.exports = mongoose.model('Customer', customerSchema)