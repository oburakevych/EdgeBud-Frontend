'use strict';

/* EdgeBud App Module */

var edgeBudModule = angular.module('edgeBudApp', ['ebProjectModule', 'filterModule']);

edgeBudModule.BASE_URL = 'http://localhost\\:8680/edgebud/';

edgeBudModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	  	  when('/projects', {templateUrl: 'views/projects.html'}).
	  	  when('/projects/new', {templateUrl: 'views/add-project.html', controller: "ProjectController"}).
	      otherwise({redirectTo: '/projects'});
	}]);