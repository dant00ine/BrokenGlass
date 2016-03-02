var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return{
		create: function(req, res){
			var newUser = new User(req.body);
			console.log('lets see what this user looks like', newUser);
			newUser.save(function(err, data) {
				if(err)
					console.log("user creation error", err)
				else
					res.json(data)
			})
		}

	// 	edit: function(req, res){

	// 	},

	// 	update: function(req, res){

	// 	},

	// 	show: function(req, res){

	// 	},

	// 	destroy: function(req, res){
			
	// 	}

	}
})();