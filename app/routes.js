// app/routes.js
console.log('app/routes.js');
// dependencies
var fs = require('fs');

//set base route
var application_route = fs.realpathSync( process.cwd() );
var passport = require('passport');

// require controllers
var user = require('./controllers/users.js');

var auth = function(req, res, next){
	if(!req.isAuthenticated())
		res.send(401);
	else
		next();
};

 module.exports = function(app) {

        app.get('*', function(req, res) {
            res.render(application_route + '/client/index.html'); // load public/index.html file
            console.log('index accessed at:', application_route + '/public/index.html');
        });

        // app.get('/main', function())

        app.post('/login',
        	passport.authenticate('local', {
        		successRedirect: '/main',
        		failureRedirect: '/login',
        		failureFlash: true
     		})
    	)	

        app.post('/users', function(req, res) {
        	user.create(req, res);
        });
};