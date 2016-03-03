BrokenGlass.config(function($routeProvider){
	$routeProvider

	.when('/login',{
		templateUrl: '../partials/login.html'
	})

	.otherwise({
		templateUrl: '../partials/hero.html'
	});
});