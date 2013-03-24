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


actionInterceptorModule.directive('ebLogUserAction', function($rootScope, UserActionResource, jqueryUI) {
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
				
				try {
					UserActionResource.log({owner: $rootScope.authorisedOwner, type: 'MouseDown', elementName: name, htlm: elm.innerHTML});
				} catch(error) {
					console.warn("Error loggin user actions: " + error);
				}

				if (!$rootScope.authorisedOwner) {
					//Create a dialog asking to register
					jqueryUI.activateDialog($rootScope.dialogs['LoginSignup'], 'Log in to get involved');
				}
			});
		}
	};
});
