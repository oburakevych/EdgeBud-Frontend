'use strict';

/* EdgeBud App Module */

var edgeBudModule = angular.module('edgeBudApp', ['ebProjectModule', 'ebCompaniesModule', 'filterModule', 'ebUserModule', 'ebActionInterceptorModule']);

edgeBudModule.BASE_URL = 'data';
edgeBudModule.BASE_URL_BACKEND = 'http://localhost\:8680/edgebud';

edgeBudModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	  	  when('/projects', {templateUrl: 'views/projects.html'}).
	  	  when('/projects/new', {templateUrl: 'views/add-project.html', controller: "ProjectController"}).
	  	  when('/projects/:id', {templateUrl: 'views/project.html', controller: "ProjectDetailsController"}).
	      otherwise({redirectTo: '/projects'});
	}]);