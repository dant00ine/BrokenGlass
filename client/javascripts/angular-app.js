"use strict";


var brokenGlass = angular.module('brokenGlass', ['ngResource', 'ngRoute'])
	.config(function($routeProvider, $locationProvider, $httpProvider){

		//================================================
    	// Check if the user is connected
    	//================================================
		var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
			// Initialize promise
			var deferred = $q.defer();

			// Make AJAX call to verify logged in status
			$http.get('/loggedin').success(function(user){
				if (user !== '0')
					deferred.resolve();

				else{
					$rootScope.message = 'You need to log in.';

					deferred.reject();
					$location.url('/login')
				}
			});

			return deferred.promise;
		};

		//================================================
	    // Add an interceptor for AJAX errors
	    //================================================
		$httpProvider.interceptors.push(function($q, $location){
			return {
				response: function(response) {
					//do something on success
					return resopnse;
				},
				responseError: function(response) {
					if(response.status === 401)
						$location.url('/login');
					return $q.reject(response);
				}
			};
		});

		$routeProvider

		.when('/', {
			templateUrl: '../partials/hero.html'
		})

		.when('/login',{
			templateUrl: '../partials/login.html',
			controller: 'loginController',
			resolve: {
				access: ["Access", function(Access) { return Access.isAnonymous(); }],
			}
		})

		.when('/admin',{
			templateUrl: '../partials/admin.html',
			resolve: {
				access: ["Access", function(Access) { return Access.hasRole("ADMIN"); }],
			}
		})

		.when('/home', {
			templateUrl: '../partials/home.html',
			resolve: {
	      		access: ["Access", function(Access) { return Access.isAuthenticated(); }],
	    	}
		})

		.otherwise({
			redirectTo: '/'
		});

}) // end of config()
.run(function($rootScope, $http){
	$rootScope.message = '';

	$rootScope.logout = function(){
		$rootScope.message = 'Logged out.'
		$http.post('/logout')
	};
});