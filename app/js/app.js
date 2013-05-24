'use strict';

/* EdgeBud App Module */

var edgeBudModule = angular.module('edgeBudApp', 
		['ebProjectModule', 
		 'ebCompaniesModule', 
		 'filterModule', 
		 'ebUserModule',
		 'ebSignupModule',
		 'ebActionInterceptorModule',
		 'ebDialogModule',
		 'ebAccountModule']
);
/* LOCALHOST
edgeBudModule.constant("BASE_URL_BACKEND","http://localhost\\:8680/livestormer-backend"); //For $resource
edgeBudModule.BASE_URL_BACKEND = 'http://localhost\:8680/livestormer-backend'; // For $http
*/

/* REMOTE SERVER beta.livestormer.com */
edgeBudModule.constant("BASE_URL_BACKEND","http://beta.livestormer.com\\:8080/livestormer-backend"); //For $resource
edgeBudModule.BASE_URL_BACKEND = 'http://beta.livestormer.com\:8080/livestormer-backend'; // For $http

edgeBudModule.BASE_URL_DATA = 'data';

edgeBudModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
          when('/front-page', {templateUrl: 'views/front-page-stripes.html'}).
	  	  when('/projects', {templateUrl: 'views/projects.html'}).
	  	  when('/projects/new', {templateUrl: 'views/add-project.html', controller: "ProjectController"}).
	  	  when('/projects/:id', {templateUrl: 'views/project-live.html', controller: "ProjectDetailsController"}).
		  when('/projects/:id/apply', {templateUrl: 'views/project-apply-form.html', controller: "ProjectDetailsController"}).
	      when('/temp/', {templateUrl: 'views/project-live.html'}).
	      otherwise({redirectTo: '/front-page'});
	}]);
