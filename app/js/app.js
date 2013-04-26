'use strict';

/* EdgeBud App Module */

var edgeBudModule = angular.module('edgeBudApp', 
		['ebProjectModule', 
		 'ebCompaniesModule', 
		 'filterModule', 
		 'ebUserModule',
		 'ebSignupModule',
		 'ebActionInterceptorModule',
		 'ebDialogModule']
);

edgeBudModule.BASE_URL = 'data';
edgeBudModule.BASE_URL_BACKEND = 'http://50.56.95.120\:8680/edgebud-backend'; 

edgeBudModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
          when('/front-page', {templateUrl: 'views/front-page-stripes.html'}).
	  	  when('/projects', {templateUrl: 'views/projects.html'}).
	  	  when('/projects/new', {templateUrl: 'views/add-project.html', controller: "ProjectController"}).
	  	  when('/projects/:id', {templateUrl: 'views/project-details.html', controller: "ProjectDetailsController"}).
	      when('/temp/', {templateUrl: 'views/project-live.html'}).
	      otherwise({redirectTo: '/front-page'});
	}]);
