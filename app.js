const users = require('./routes/user');
const express = require('express');
const mongoose = require('mongoose');

/**
 * Data base connection
*/
mongoose.connect('mongodb://localhost:27017/PruebaMap1', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('Cannot connect to MongoDB...', err));

/**
 * Express running
 */
 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use('/api/users', users);

 /**
 * Connect and listen in port
 */
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`API RESTFul Running on port ${port}...`);
});