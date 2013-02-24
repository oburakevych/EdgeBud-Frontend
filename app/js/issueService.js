var issueModule = angular.module('issueApp', ['ngResource']);

issueModule.directive('issueList', function() {
	return {
		restrict: 'E',
		scope: {
			orderBy: '@',
			radius: '@',
		},
		templateUrl: 'views/issue_list.html'
	};
});

issueModule.securityHeaders = {
	'X-Parse-Application-Id': '8NMa9Rsekvkh8k1DNI0g1ehyVLkiTFDV7Mnn2a6i',
	'X-Parse-REST-API-Key': 'eOBxve3CJq7QBms7BRwKPK3g1hwBH4ccfqpKgvVt'
};

issueModule.factory('IssueService', function($resource) {
		return $resource('https://api.parse.com/1/classes/incident/:id', 
				{},
				{
					get: {
						method: 'GET',
						headers: issueModule.securityHeaders
					},
					save: {
						method: 'PUT',
						headers: issueModule.securityHeaders
					}
				});
	}
);