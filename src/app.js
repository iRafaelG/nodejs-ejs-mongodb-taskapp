const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Database connection

mongoose.connect('mongodb://localhost/crudnodejsmongodb')
    .then(db => console.log('Database connected'))
    .catch(err => console.log(err));

// Import routes

const routes = require('./routes/routes');

// Express setting

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express middleware

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// Routes

app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})