'use strict';

function UserSignupLoginController($scope, $rootScope, $cookieStore, $timeout, SecurityService, jqueryUI) {
	$scope.haveAccount = false;
	$scope.owner = {};

	$scope.showLoginSignupDialog = function() {
		jqueryUI.activateDialog($rootScope.dialogs['LoginSignup'], 'Welcome to LocalEqual Beta');
	}
	
	$scope.signup = function(successFn, errorFn) {
		console.log("Signup " + angular.toJson($scope.owner));
		SecurityService.signup($scope.owner, $scope, successFn, errorFn);
	}

	$scope.login = function(successFn, errorFn) {
		console.log("Login " + angular.toJson($scope.owner));
		SecurityService.login($scope.owner, $scope, successFn, errorFn);
	}

	if (!$rootScope.authorisedOwner) {
		var userCookie = $cookieStore.get("EB_LOGGED_USER");
		if (userCookie) {
			SecurityService.login(userCookie);
		} else {
			$timeout($scope.showLoginSignupDialog, 200, true);
		}
	}

	$scope.logout = function() {
		console.log("Logging out " + angular.toJson($rootScope.authorisedOwner));
		SecurityService.logout();
	}

	$rootScope.logMyAction = function(actionType, element) {
		log.console("Logging user action: ");
	}
	
	$scope.$on('event:show-login-signup-dialog', function() {
		$scope.showLoginSignupDialog();		
	});
} 

function ProjectsController($scope, $rootScope, ProjectResource) {
	$rootScope.showHero = true;
	$scope.projects = ProjectResource.query();


	var splitIntoRows = function(array, columns) {
		if (array.length <= columns) {
			return [ array ];
		}

		var rowsNum = Math.ceil(array.length / columns);

		var rowsArray = new Array(rowsNum);

		for ( var i = 0; i < rowsNum; i++) {
			var columnsArray = new Array(columns);
			for (var j = 0; j < columns; j++) {
				var index = i * columns + j;

				if (index < array.length) {
					columnsArray[j] = array[index];
				} else {
					break;
				}
			}

			rowsArray[i] = columnsArray;
		}

		return rowsArray;
	}

	$scope.$watch('projects', function() {
		$scope.projectRows = splitIntoRows($scope.projects, 1);
	});
}

function ProjectController($scope, $rootScope, UserActionResource, ProjectResource, CopmaniesResource, SecurityService) {
	$scope.newProject = {
			company: {
				figures: []
			}
	};
	
	$scope.getCompanies = function() {
		$scope.companies = CopmaniesResource.query();
	}
	
	$scope.addCompany = function() {
		if ($scope.newProject.company.$update) {
			$scope.newProject.company.$update();
		} else {
			CopmaniesResource.save($scope.newProject.company, $scope.getCompanies);	
		}
	}
	
	$scope.deleteCompany = function() {
		if ($scope.newProject.company.$delete) {
			$scope.newProject.company.$delete();	
		}
	}
	
	
	
	$scope.addProject = function() {
		if (!$scope.newProject.status) {
			$scope.newProject.status = 'PENDING';
		}
		
		angular.uppercase($scope.newProject.status);
		
		if ($scope.opportunities) {
			$scope.newProject.opportunities = [];
			angular.forEach($scope.opportunities, function(opportunity, index) {
				$scope.newProject.opportunities.push({name: opportunity});	
			});
		}
		
		ProjectResource.save($scope.newProject);
	}
	
	$scope.clear = function() {
		$scope.newProject = {
				company: {
					figures: []
				}
		};	
	}
	
	$scope.addFigure = function() {
		if (!$scope.newProject.company.figures) {
			$scope.newProject.company.figures = [];
		}
		$scope.newProject.company.figures.push({id: "" + Math.random()});
	}
	
	$scope.getImageSrc = function() {
		if (!$scope.project.project_detail.imageName) {
			return "/app/img/photo-main-default.jpg";
		} else {
			return "/app/img/" + $scope.project.id + "/photo-main.jpg";
		}
	}
	
	$scope.getCompanies();
}
	
function ProjectDetailsController($scope, $rootScope, $routeParams, ProjectResource) {
	$scope.project = ProjectResource.get({projectId: $routeParams.id});
	$rootScope.showHero = false;

}

function DialogController($scope, $rootScope) {
	if (!$rootScope.dialogs) {
		$rootScope.dialogs = {};
		$rootScope.dialogs['LoginSignup'] = $('#eb_must_login_dialog');
		$rootScope.dialogs['TakeAction'] = $('#eb_take_action_dialog');
	}
	
	$scope.closeDialog = function(name) {
		if (name && $scope.dialogs[name]) {
			$scope.dialogs[name].dialog("close");
		}
	}

	$scope.closeLoginSignupDialog = function() {
		$scope.closeDialog('LoginSignup');
	}

	$scope.closeTakeActionDialog = function() {
		$scope.closeDialog('TakeAction');
	}
}

function TakeActionController($scope, $rootScope, UserActionResource, jqueryUI) {
	$scope.logAction = function() {
		if ($scope.userAction) {
			UserActionResource.log($scope.userAction);
		}
	}

	$scope.$on('event:show-action-dialog', function(event, args) {
		console.log('event:show-action-dialog even caught');
		$scope.initAction(args);

		jqueryUI.activateDialog($rootScope.dialogs['TakeAction'], 'Take an action');
	});

	$scope.initAction = function(details) {
		$scope.userAction = {
			owner: $rootScope.authorisedOwner, 
			type: 'ManualAction',
			message: ''
		};

		if (details) {
			if (details.elementName) {
				$scope.userAction.elementName = details.elementName;
			}
		}
	}
}
