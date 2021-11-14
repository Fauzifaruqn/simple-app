const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');


const app = express();


// 1) Middleware

app.use(morgan('dev'))


app.use(express.json())

app.use((req,res,next) => {
    console.log('Hello from the middleware ')
    next();
})

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get('/', (req, res) => {
//     res
//     .status(404)
//     .json({message: 'Hello from the server side', app: 'Simple App'});
// })

// app.post('/', (req, res) => {
//     res.send('You canm post to this endpoint')
// })

const books = JSON.parse(fs.readFileSync(`${__dirname}/data/books.json`));


const getAllBooks = (req, res) => {
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


const createBook = (req, res) => {
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
const getBook =  (req, res) => {
    
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


const updateBook = (req, res) =>{

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
    // fs.writeFile(`${__dirname}/data/books.json`, JSON.stringify(books), err => {
    //     res.status(201).json({
    //         status: 'Success',
    //         data: {
    //             books: newBooks
    //         }
    //     })
    // })
}

const deleteBook = (req, res) => {
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


const getAllUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

const createUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

const getUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

const updateUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

const deleteUser = (req,res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This is route is not yet defined'
    })
  
}

// app.get('/api/v1/books', getAllBooks)
// app.post('/api/v1/books', createBook)
// app.get(`/api/v1/books/:id`, getBook)
// app.patch(`/api/v1/books/:id`, updateBook)
// app.delete('/api/v1/books/:id', deleteBook)


// 3) Routes


const bookRouter = express.Router();
const userRouter = express.Router();


bookRouter
    .route('/')
    .get(getAllBooks)
    .post(createBook);


bookRouter
    .route('/:id')
    .get(getBook)
    .patch(updateBook)
    .delete(deleteBook)

userRouter
    .route('/')
    .get(getAllUser)
    .post(createUser)

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)

// 4) start server

const port = 3000

app.listen(port, () => {
    console.log(`App running on port ${port} ...`)
})