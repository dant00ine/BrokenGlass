// app/routes.js
console.log('app/routes.js');
// dependencies
var fs = require('fs');

//set base route
var application_route = fs.realpathSync( process.cwd() );

// require controllers
var user = require('./controllers/users.js');

 module.exports = function(app) {

        app.get('*', function(req, res) {
            res.render(application_route + '/client/index.html'); // load public/index.html file
            console.log('index accessed at:', application_route + '/public/index.html');
        });

        app.post('/users', function(req, res) {
        	user.create(req, res);
        });
};