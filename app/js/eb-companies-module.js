var companiesModule = angular.module('ebCompaniesModule', ['ngResource']);

companiesModule.factory('CopmaniesResource', function($resource) {
	return $resource(edgeBudModule.BASE_URL + '/companies.json', {},
			{
				update: {method: "PUT"},
				delete: {method: "DELETE", params: {id: "@id"}}
			}
	);
});