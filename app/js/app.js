'use strict';

/* EdgeBud App Module */

var edgeBudModule = angular.module('edgeBudApp', 
		['ebProjectModule', 
		 'ebCompaniesModule', 
		 'filterModule', 
		 'ebUserModule', 
		 'ebActionInterceptorModule',
		 'ebDialogModule']
);

edgeBudModule.BASE_URL = 'data';
// Use when running Front-end locally and backend remotly
// edgeBudModule.BASE_URL_BACKEND = 'http://50.56.95.120\:8680/edgebud-backend'; 

// Use when running on the server or both Front-end and Back-end locally
edgeBudModule.BASE_URL_BACKEND = 'http://localhost\:8680/edgebud-backend';

edgeBudModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	  	  when('/projects', {templateUrl: 'views/projects.html'}).
	  	  when('/projects/new', {templateUrl: 'views/add-project.html', controller: "ProjectController"}).
	  	  when('/projects/:id', {templateUrl: 'views/project.html', controller: "ProjectDetailsController"}).
	      otherwise({redirectTo: '/projects'});
	}]);