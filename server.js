// ./server.js

// setup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express       = require('express');
var passport	  = require('passport');

var session       = require('express-session');
var flash 		  = require('connect-flash');

var morgan 		  = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var mongoose 	  = require('mongoose');
var configDB	  = require('./app/config/database.js');
var port 		  = process.env.PORT || 1337;
var app           = express();
mongoose.connect(configDB.url);

// configuration ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// require('./app/config/passport/passport')(passport); // pass passport for configuration
// set up express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser({extended:true})); // get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/client'));

// passport configuration
app.use(session({ secret: 'birdswhochattercanneverexpecttobewise' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//Initialize Passport
var initPassport = require('./app/config/passport/init.js');
initPassport(passport);

var routes = require('./app/routes/index.js')(passport);
app.use('/', routes) 

// static files location 


// configure routing and mongoose
require('./app/config/mongoose.js');
require('./app/routes.js')(app, passport); 

// start server (elite style) ~~~~~~~~~~~~~~~~~~~~~~~
app.listen(port, function(){
  console.log('**----- port 1337 -----**');
  console.log('**-----  run run  -----**');
  console.log('**----- ohso leet -----**');
})

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// expose app
exports = module.exports = app;