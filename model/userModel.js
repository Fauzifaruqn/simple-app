const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        validate: [validator.isEmail, "Please provice a valid email"],
        unique: true,
    },
    password:  {
        type: String, 
        required: true,
        minlength: 8,
        select: false
    },
    passwordConfirmation: {
        type: String,
        required: [true, "Please you confirm your password"],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password are not the same'
        },
        select: false
    }
})

userSchema.pre('save', async function(next) {
    // only run this function if password was actually modified
    if(!this.isModified('password'))  return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirmation = undefined;

    next();

})


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.correctEmail= async function(candidateEmail, userEmail) {
    return await compare(candidateEmail, userEmail);
}

const User = mongoose.model('User', userSchema)

module.exports = User;