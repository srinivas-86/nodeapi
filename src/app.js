const express = require('express');
const app = express();
const morgan = require("morgan");
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//db connection
mongoose.connect(
process.env.MONGO_URI,
{useNewUrlParser: true , useUnifiedTopology: true}
)
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
console.log(`DB connection error: ${err.message}`)
});

 


const postRoutes = require('./routes/post');

const myOwnMiddleware = (req, res, next) => { 
    console.log('middleware applied !!!');
    next(); 
};


app.use(myOwnMiddleware);
app.use(morgan('dev'));
//app.use(bodyParser.json()); // is deprecated
app.use(express.json()) //For JSON requests
app.use(expressValidator());

app.use("/", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node JS API running on port ${port}`);
});