const express = require('express');
const morgan = require('morgan');
const app = express();
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middleware

app.use(morgan('dev'))

app.use(express.json())
app.use(express.static(`${__dirname}/public`))


app.use((req,res,next) => {
    console.log('Hello from the middleware ')
    next();
})

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})



// 3) Routes

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)

module.exports = app;