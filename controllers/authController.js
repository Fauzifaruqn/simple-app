const jwt = require('jsonwebtoken');
const User = require('../model/userModel')
const dotenv = require('dotenv');
dotenv.config()


// 1) membuat token atau signin token
const signToken = id => {
    return jwt.sign({
       id
        
    }, process.env.JWT_KEY, {
        expiresIn: '2h'
    } )
}


exports.register = async (req, res) => {
    
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        })
        const token = signToken(newUser._id)
        res.status(201).json({
            status: "Succes",
            token: token,
            data: {
                user: newUser
            }
    
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
}

exports.login = async (req,res, next) => {
    const {email, password} = req.body;
    console.log(email)


    try {

        // 1) check if email and password exist
    if(!email || !password) {
        res.status(400).json({
            status: 'Failed',
            message: 'Please provide email and password'
        })

    }

    // 2) check if user exist and passowed is correct

    const userdata = await User.findOne({email: email}).select('+password')
    // console.log(userdata.email != email)
    console.log('hey', userdata)
    // console.log(email)

    const correctpass = await userdata.correctPassword(password, userdata.password)

    console.log('test',correctpass);

    if(!correctpass) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Incorent password',
        })
    }
    // 3) if everythin ok, send token to client

    const token = signToken(userdata._id)
    res.status(200).json({
        status: 'Succes',
        token
    }) 
        
    } catch (error) {
        res.status(401).json({
            status: 'Failed',
            message: 'Incorent email',
        })
    }
}

exports.protect = async (req,res, next) => {
    try {
        // 1) mendapatkan token dan check jika token tersebut ada
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            
        }
        console.log(token)
        if(!token) {
            return res.status(401).json({
                status: 'Failed',
                message: 'you are not loged in please loged in to get access',
            })
        }
        

        // Verification token 
        const decode = await (jwt.verify)(token, process.env.JWT_KEY)
        console.log(decode)


        // check if user still exists 
        const users1 = await User.findById(decode.id);

        if(!users1) {
            return  res.status(400).json({
                status: 'Failed',
                message: 'user not found',
            })
        }

        console.log('nih',users1);

        // chec if user
        next()
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
       
   
}