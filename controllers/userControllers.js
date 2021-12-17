const express = require('express')
const User = require('../model/userModel')

exports.getAllUser = async (req,res, next) => {
    try {
        const user = await User.find()
         res.status(200).json({
        status: 'Success',
        requestDate: req.requestTime,
        results: user.length,
        data: {
            user
        }
    })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
  
}


exports.createUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

exports.getUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

exports.updateUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

exports.deleteUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}
