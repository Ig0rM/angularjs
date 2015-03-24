var express       = require('express');
var app           = express();

var bodyParser    = require('body-parser');

var passport      = require('passport');
var flash         = require('connect-flash');

var morgan        = require('morgan');
var session       = require('express-session');



app.use(morgan('dev'));//

app.use(bodyParser());

app.set('view engine', 'ejs'); //


// required for passport
app.use(session({ secret: 'lblog' })); // session secret

app.use(flash()); // use connect-flash for flash messages stored in session



module.exports = app;