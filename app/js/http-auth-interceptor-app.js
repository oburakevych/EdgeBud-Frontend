
var httpAuthInterceptorModule = angular.module('http-auth-interceptor', []);

/**
* $http interceptor.
* On 401 response - it stores the request and broadcasts 'event:angular-auth-loginRequired'.
*/
httpAuthInterceptorModule.config(['$httpProvider', function($httpProvider) {
	var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
		function success(response) {    	  
			return response;
		}
 
		function error(response) {
	    	if (response.status === 0) {
	    		console.warn("The server is not responding or is not reachable!");
	    			    			
	    		$rootScope.$broadcast('event:server-not-reachable', response);
	    		
	    		return $q.reject(response);
	    	}
	    	  
	        if (response.status === 401 || response.status === 403) {
	          var deferred = $q.defer();
	          console.warn(response.status);
	          
	          $rootScope.$broadcast('event:auth-loginRequired', response);
	          
	          return deferred.promise;
	        }
	        
	        if (response.status === 500) {
	        	console.warn(response.status);
	            var deferred = $q.defer();
	            
	            $rootScope.$broadcast('event:server-error', response);
	                        
	            return deferred.promise;
	        }
	        
	        if (response.status === 503) {
	        	console.warn("Error 503");
	            var deferred = $q.defer();
	            
	            $rootScope.$broadcast('event:server-error-temporary', response);
	                        
	            return deferred.promise;
	        }

	        return $q.reject(response);
		}
 
		return function(promise) {
			return promise.then(success, error);
		}
	}];
    
    $httpProvider.responseInterceptors.push(interceptor);
}]);