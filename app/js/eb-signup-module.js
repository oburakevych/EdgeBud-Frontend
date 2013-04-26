var ebSignupModule = angular.module('ebSignupModule', ['ngResource', 'ngCookies']);

ebUserModule.directive('ebSignupForm', function() {
	return {
		restrict: 'A, E',
		scope: {
			formType: '@ebFormType'
		},
		link: function(scope, elm, attrs) {
		},
		templateUrl: 'views/signup/signup.html'
	};
});