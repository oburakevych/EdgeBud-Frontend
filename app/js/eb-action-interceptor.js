var actionInterceptorModule = angular.module('ebActionInterceptorModule', []);

/*
actionInterceptorModule.factory('UserActionResourcer', function($resource) {
	return $resource(edgeBudModule.BASE_URL_BACKEND + '/useractions', {},
			{
				log: {method: "POST"}
			}
	);
});
*/

actionInterceptorModule.factory('UserActionResource', function($http) {
	return {
		log: function(userAction) {
				if (userAction) {
					$http.post(edgeBudModule.BASE_URL_BACKEND + '/useractions', userAction);
				}
			}
	}
});


actionInterceptorModule.directive('ebLogUserAction', function($rootScope, UserActionResource) {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			elm.mousedown(function() {
				var name = null;
				if (elm && elm[0]) {
					elm = elm[0];
				} ;

				if (elm.attributes && elm.attributes.length > 0) {
					for (var i = 0; i < elm.attributes.length; i++) {
						if (elm.attributes[i].nodeName && elm.attributes[i].nodeName === 'eb-log-user-action') {
							name = elm.attributes[i].nodeValue;
							break;
						}
					}	
				}
				
				UserActionResource.log({owner: $rootScope.authorisedOwner, type: 'MouseDown', elementName: name, htlm: elm.innerHTML});
			});
		}
	};
});
