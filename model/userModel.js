const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please input your name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please input your email'],
        lowercase: true,
        validate: [validator.isEmail, "Please provice a valid email"]
    },
    password:  {
        type: String, 
        required: true,
        minlength: 8,
    },
    passwordConfirmation: {
        type: String,
        required: [true, "Please you confirm your password"]
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User;