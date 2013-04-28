var ebAccountCompletenessModule = angular.module('ebAccountCompletenessModule', ['ngResource']);

ebAccountCompletenessModule.directive('ebAccountCompleteness', function() {
	return {
		restrict: 'A, E',
		scope: true,
		templateUrl: 'views/account-completeness.html'
	};
});

ebAccountCompletenessModule.factory('AccountCompletenessTaskResource', function($resource, BASE_URL_BACKEND) {
	return $resource(BASE_URL_BACKEND + '/account/:accountId/completeness');
});