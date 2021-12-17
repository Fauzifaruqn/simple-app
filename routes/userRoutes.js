const express = require('express')

const userController = require('../controllers/userControllers')
const router = express.Router();

const authController = require('../controllers/authController')


router
    .post('/register', authController.register);

router
    .post('/login', authController.login);

router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;