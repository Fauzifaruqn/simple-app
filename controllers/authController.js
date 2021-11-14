const User = require('../model/userModel')

exports.register = async (req, res) => {
    
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            status: "Succes",
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