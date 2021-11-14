const express = require('express')

const fs = require('fs')

const port = 3001


const books = JSON.parse(fs.readFileSync(`${__dirname}/data/books.json`))

const app = express();


app.get('/', (req, res) => {
    res.status(200).json({
        test: 'Hello'
    })
})



app.get('/api/v1/books', (req,res) => {
    res.status(200).json({
        status: 'Succes',
        data: {
            books: books
        }
    })
})


app.listen(port, () => {
    console.log('App running on port ', port)
})