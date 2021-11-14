const express = require('express')
// const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Book = require('../model/bookModel')

// const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));


exports.checkID = async (req, res, next, val) => {
    console.log(`Book Id is : ${val}`)
    const id = req.params.id
    const book = await Book.findById(id)
    if(!book) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Format ID or ID not found'
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.author || !req.body.country) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Missing Author or Country field'
        })
    }
    next();
}

exports.getAllBooks = async (req, res) => {
    try {
        const book = await Book.find()
         res.status(200).json({
        status: 'Success',
        requestDate: req.requestTime,
        results: book.length,
        data: {
            book
        }
    })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
}


exports.createBook = async (req, res) => {

    try {
        const newBook = await Book.create(req.body).then()
        res.status(201).json({
            status: 'Success',
            data: {
                books: newBook
            } 
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
        
}
exports.getBook = async (req, res) => {
    const id = req.params.id
       
    try {
      const book =  await Book.findById(id)
    
      res.status(200).json({
        status: 'Success',
        data: {
            book: book
        }
        
    })
        
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
        
    }
}


exports.updateBook = async (req, res) =>{
    const id = req.params.id

    try {
        const book = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'Succes',
            data: {
                book: '<Updated to here ...>'
            }
        })  
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        await Book.findByIdAndDelete(id)
        res.status(204).json({
            status: 'Success',
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
}


// module.exports = bookController;