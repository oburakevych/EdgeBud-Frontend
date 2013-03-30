var projectModule = angular.module('ebProjectModule', ['ngResource']);

projectModule.directive('ebProjectCard', function() {
	return {
		restrict: 'A, E',
		scope: {
			project: "&ebObject"
		},
		link: function(scope, elm, attrs) {
			scope.project = scope.project();
		},
		templateUrl: 'views/project-card.html'
	};
});

projectModule.factory('ProjectResource', function($resource) {
	return $resource(edgeBudModule.BASE_URL + '/projects/:projectId.json', {},
		{
			query: {method:'GET', params:{projectId: 'projects'}, isArray: true}
		}
	);
});

projectModule.factory('ProjectDetailsResource', function($resource) {
	return $resource(edgeBudModule.BASE_URL + '/projects/:projectId/details.json');
});