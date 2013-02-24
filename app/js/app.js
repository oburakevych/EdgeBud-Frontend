'use strict';

/* Resilience App Module */

var resilienceModule = angular.module('resilienceApp', ['issueApp', 'filterApp', 'mapApp']);

resilienceModule.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.
	  	  when('/view', {templateUrl: 'views/combined_view.html'}).
	      when('/issues', {templateUrl: 'views/issue_list_view.html', controller: IssueListController}).
	      when('/issues/:issueId', {templateUrl: 'views/issue.html', controller: IssueController}).
	      when('/map', {templateUrl: 'views/map_view.html', controller: MapController}).
	      otherwise({redirectTo: '/'});
	}]);