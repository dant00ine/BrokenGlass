// ./server.js

// setup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express       = require('express');  
var app           = express();
var port 		  = process.env.PORT || 1337;

var passport	  = require('passport');
var session       = require('express-session');
var flash 		  = require('connect-flash');

var morgan 		  = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var mongoose 	  = require('mongoose');
var configDB	  = require('./app/config/database.js');
mongoose.connect(configDB.url);
// configuration ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

require('./app/config/passport/passport')//(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser({extended:true})); // get information from html forms

// required for passport
app.use(session({ secret: 'birdswhochattercanneverexpecttobewise' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// static files location 
app.use(express.static(__dirname + '/client'));

// configure routing and mongoose
require('./app/config/mongoose');
require('./app/routes')(app, passport); 

// start server (elite style) ~~~~~~~~~~~~~~~~~~~~~~~
app.listen(port, function(){
  console.log('**----- port 1337 -----**');
  console.log('**-----  run run  -----**');
  console.log('**----- ohso leet -----**');
})

// expose app
exports = module.exports = app;