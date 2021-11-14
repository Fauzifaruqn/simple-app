const express = require('express')
const bookController = require('../controllers/bookControllers')
const router = express.Router();
// const bookRouter = express.Router();

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook);


router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook)
    
module.exports = router;