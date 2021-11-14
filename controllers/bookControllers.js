const express = require('express')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));


exports.getAllBooks = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'Success',
        requestDate: req.requestTime,
        results: books.length,
        data: {
            books
        }
    })
}


exports.createBook = (req, res) => {
        const v1options = {
            node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
            clockseq: 0x1234,
            msecs: new Date('2011-11-01').getTime(),
            nsecs: 5678,
          };
    
        const newId = uuidv4(v1options);
        console.log(newId);    
        const newBooks = Object.assign({id: newId}, req.body)
    
    
        books.push(newBooks);
        fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(books), err => {
            res.status(201).json({
                status: 'Success',
                data: {
                    books: newBooks
                }
            })
        })
        
}
exports.getBook =  (req, res) => {
    
        console.log(req.params);
    
        const id = req.params.id
    
        const book = books.find(el => el.id === id)
        if (!book) {
           return res.status(404).send('Data not found')
        }
        res.status(200).json({
            status: 'Success',
            data: {
                book
            }
        })
}


exports.updateBook = (req, res) =>{

    const id = req.params.id

    const book = books.find(el => el.id === id)

    if (!book) {
        return res.send('Data not found')
    }


    res.status(200).json({
        status: 'Succes',
        data: {
            book: '<Updated to here ...>'
        }
    })
}

exports.deleteBook = (req, res) => {
    const id = req.params.id

    const book = books.find(el => el.id === id)

    if (!book) {
        return res.send('Data not found')
    }

    res.status(204).json({
        status: 'Success',
        data: null
    })
}


// module.exports = bookController;