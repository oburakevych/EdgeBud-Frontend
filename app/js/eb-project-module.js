var projectModule = angular.module('ebProjectModule', ['ngResource']);

projectModule.directive('ebProject', function() {
	return {
		restrict: 'A, E',
		scope: {
			id: '@ebId',
			name: '@ebName',
			description: '@ebDescription'
		},
		templateUrl: 'views/project.html'
	};
});

projectModule.factory('ProjectResource', function($resource) {
	return $resource('http://127.0.0.1:8680/edgebud/projects');
});