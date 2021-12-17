const express = require('express')
const bookController = require('../controllers/bookControllers')
const router = express.Router();
// const bookRouter = express.Router();
const authController = require('../controllers/authController')

router.param('id', bookController.checkID)
router
    .route('/')
    .get(authController.protect, bookController.getAllBooks)
    .post(bookController.checkBody, bookController.createBook);


router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook)
    
module.exports = router;