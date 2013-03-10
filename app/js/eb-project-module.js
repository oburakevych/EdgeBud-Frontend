var projectModule = angular.module('ebProjectModule', ['ngResource']);

projectModule.directive('ebProject', function() {
	return {
		restrict: 'A, E',
		scope: {
			id: '@ebId',
			name: '@ebName',
			description: '@ebDescription',
			imageName: '@ebImageName',
			companyName: '@ebCompanyName',
			status: "@ebStatus"
		},
		link: function(scope, elm, attrs) {
			// TODO
		},
		templateUrl: 'views/project.html'
	};
});

projectModule.factory('ProjectResource', function($resource) {
	return $resource(edgeBudModule.BASE_URL + 'projects');
});