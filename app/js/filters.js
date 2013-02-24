var filtersModule = angular.module('filterApp', []);

filtersModule.filter('timeSince', function() { 
		return function(date) {
			return prettyDate(date);
		}
});