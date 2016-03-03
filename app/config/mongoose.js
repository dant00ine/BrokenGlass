// mongoose.js
var mongoose = require('mongoose');
var fs = require('fs');

var application_route = fs.realpathSync( process.cwd() );

var models_path = application_route + '/app/models';
console.log("Models path:", models_path);

// find appropriate model for 
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file)
	}
})