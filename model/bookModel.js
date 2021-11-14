const mongoose = require('mongoose');


const bookSchema = new  mongoose.Schema({
    author: {
        type: String,
        unique: true,
        required: true,
        
    },
    country: String, 
    imageLink: String, 
    language: String,
    link: String, 
    pages: String,
    title: String,
    year: String
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;