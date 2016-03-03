brokenGlass.controller('loginController', function($scope, loginFactory){
	var that = this;

	that.login = function(){
		console.log('login method in ngController');

		loginFactory.login(that.user, function(response){
			if(response.success){
				console.log('successfully logged in', response);
			} else {
				that.errors = response.message;
				console.log('errors', that.errors);
			}
		});
	}
})