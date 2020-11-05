const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');


const AccountSchema = new mongoose.Schema({
    // additional user properties
})

// auto creates static methods and username and password properties
AccountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Account", AccountSchema)