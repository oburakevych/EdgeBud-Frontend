var ebUserModule = angular.module('ebUserModule', ['ngResource', 'ngCookies']);

ebUserModule.directive('ebLoginForm', function() {
	return {
		restrict: 'A, E',
		link: function(scope, elm, attrs) {
		},
		templateUrl: 'views/user-signup-login.html'
	};
});

ebUserModule.factory('SecurityService', function($http, $rootScope, $cookieStore) {
	return {
		signup: function(owner, $scope, successFn, errorFn) {
			if (owner && owner.username && owner.password) {
				if ($scope) {
					$scope.authorisationFailed = null;
				}
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/owners/signup', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
						$cookieStore.put("EB_LOGGED_USER", $rootScope.authorisedOwner);
						//$rootScope.$apply();
						if (successFn) {
							successFn();
						}
					}).error(function(data) {
						console.warn('Signup failed: ' + data);
						if ($scope) {
							$scope.authorisationFailed = data;
						}

						if (errorFn) {
							errorFn();
						}
					});
			}
		},

		login: function(owner, $scope, successFn, errorFn) {
			if (owner && owner.username && owner.password) {
				if ($scope) {
					$scope.authorisationFailed = null;
				}
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/owners/authenticate', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedOwner = data;
						$cookieStore.put("EB_LOGGED_USER", $rootScope.authorisedOwner);
						//$rootScope.$apply();
						if (successFn) {
							successFn();
						}
					}).error(function(data) {
						console.warn('Authorisation failed: ' + data);
						if ($scope) {
							$scope.authorisationFailed = data;
						}

						if (errorFn) {
							errorFn();
						}
					});
			}
		},

		logout: function() {
			if ($rootScope.authorisedOwner) {
				$rootScope.authorisedOwner = undefined;
			}

			if ($cookieStore.get("EB_LOGGED_USER")) {
				$cookieStore.remove("EB_LOGGED_USER");
			}
		}
	}
});