var ebUserModule = angular.module('ebUserModule', ['ngResource', 'ngCookies']);

ebUserModule.directive('ebLoginForm', function() {
	return {
		restrict: 'A, E',
		link: function(scope, elm, attrs) {
		},
		templateUrl: 'views/user-signup-login.html'
	};
});

ebUserModule.factory('SecurityService', function($http, $rootScope, $cookieStore, BASE_URL_BACKEND) {
	return {
		signup: function(account, $scope, successFn, errorFn) {
			if (account && account.owner && account.owner.username && account.owner.password) {
				if ($scope) {
					$scope.authorisationFailed = null;
				}
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/account/signup', account)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedAccount = data;
						if ($rootScope.authorisedAccount && $rootScope.authorisedAccount.owner) {
							$cookieStore.put("EB_LOGGED_USER", $rootScope.authorisedAccount.owner);
						}
						if (successFn) {
							successFn();
						}

						$rootScope.$broadcast('event:after-user-logged-in');
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
				$http.post(edgeBudModule.BASE_URL_BACKEND + '/owner/authenticate', owner)
					.success(function(data) {
						console.log("authenticated successfully");
						$rootScope.authorisedAccount = data;
						if ($rootScope.authorisedAccount && $rootScope.authorisedAccount.owner) {
							$cookieStore.put("EB_LOGGED_USER", $rootScope.authorisedAccount.owner);
						}

						if (successFn) {
							successFn();
						}

						$rootScope.$broadcast('event:after-user-logged-in');
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
			if ($rootScope.authorisedAccount) {
				$rootScope.authorisedAccount = undefined;
			}

			if ($cookieStore.get("EB_LOGGED_USER")) {
				$cookieStore.remove("EB_LOGGED_USER");
			}
		}
	}
});