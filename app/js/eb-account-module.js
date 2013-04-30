var ebAccountModule = angular.module('ebAccountModule', ['ngResource']);

ebAccountModule.directive('ebAccountCompleteness', function() {
	return {
		restrict: 'A, E',
		scope: true,
		templateUrl: 'views/account/account-completeness.html'
	};
});

ebAccountModule.directive('ebAccountActivities', function() {
	return {
		restrict: 'A, E',
		scope: true,
		templateUrl: 'views/account/account-activities.html'
	};
});

ebAccountModule.factory('AccountCompletenessTaskResource', function($resource, BASE_URL_BACKEND) {
	return $resource(BASE_URL_BACKEND + '/account/:accountId/completeness');
});

ebAccountModule.factory('AccountResource', function($resource, BASE_URL_BACKEND) {
	return $resource(BASE_URL_BACKEND + '/account/:accountId', {accountId: '@accountId'},
		{
			'getBookmarks': {method: 'GET', url: BASE_URL_BACKEND + '/account/:accountId/bookmark', params: {accountId: '@accountId'}, isArray: true},
			'addBookmark': {method: 'POST', url: BASE_URL_BACKEND + '/account/:accountId/bookmark', params: {accountId: '@accountId'}},
			'removeBookmark': {method: 'DELETE', url: BASE_URL_BACKEND + '/account/:accountId/bookmark', params: {accountId: '@accountId', objectId: '@objectId', objectType: '@objectType'}},

			'getActivities': {method: 'GET', url: BASE_URL_BACKEND + '/account/:accountId/activity', params: {accountId: '@accountId'}, isArray: true}
		});
});

ebAccountModule.factory('BookmarkResource', function($resource, BASE_URL_BACKEND) {
	return $resource(BASE_URL_BACKEND + '/account/{accountId}/bookmark/:bookmarkId');
});