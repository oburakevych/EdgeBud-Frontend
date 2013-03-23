var ebUserModule = angular.module('ebUserModule', ['ngResource', 'ngCookies']);

ebUserModule.directive('ebLoginForm', function() {
	return {
		restrict: 'A, E',
		link: function(scope, elm, attrs) {
			var ii = scope;
		},
		templateUrl: 'views/user-signup-login.html'
	};
});

ebUserModule.factory('SecurityService', function($http, $rootScope) {
	return {
		signup: function(owner) {
			if (owner && owner.username && owner.password) {
				$rootScope.authorisationFailed = null;
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/owners/signup', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
					}).error(function(data) {
						console.warn('Signup failed: ' + data);
						$rootScope.authorisationFailed = data;
					});
			}
		},

		login: function(owner) {
			if (owner && owner.username && owner.password) {
				$rootScope.authorisationFailed = null;
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/owners/authenticate', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
					}).error(function(data) {
						console.warn('Authorisation failed: ' + data);
						$rootScope.authorisationFailed = data;
					});
			}
		},

		logout: function() {
			if ($rootScope.authorisedOwner) {
				$rootScope.authorisedOwner = undefined;
			}
		}
	}
});