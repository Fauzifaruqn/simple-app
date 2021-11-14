const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config();

const urldb = process.env.DATABASE_LOCAL
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true, //make this true
//     autoIndex: true, //make this also true
//   };
mongoose.connect(urldb).then(() =>  console.log('Db Connection Successfully'))

// testBook.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log('ERRROR', err)
// });

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port} ...`)
})