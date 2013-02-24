var mapModule = angular.module('mapApp', ['ngResource']);

mapModule.functions = {};

mapModule.functions.initMap = function($scope, iElement, iAttrs) {
	
}

mapModule.directive('map', function($timeout) {
	return {
		restrict: 'E',
		scope: {
		},
		templateUrl: 'views/map.html',
		link: function($scope, iElement, iAttrs) {
			$timeout(function() {
				mapModule.functions.initMap($scope, iElement, iAttrs);	
			}, 200, true);
			
		}
	};
});



issueModule.factory('MapService', function($resource) {
		return $resource('URL', 
				{},
				{
					get: {
						method: 'GET',
						headers: {
							'X-Parse-Application-Id': '8NMa9Rsekvkh8k1DNI0g1ehyVLkiTFDV7Mnn2a6i',
							'X-Parse-REST-API-Key': 'eOBxve3CJq7QBms7BRwKPK3g1hwBH4ccfqpKgvVt'
						}
					}
				});
	}
);