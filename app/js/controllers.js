'use strict';

function UserSignupLoginController($scope, $rootScope, $cookieStore, SecurityService) {
	$scope.haveAccount = false;
	$scope.owner = {};

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
		}
	}

	$scope.logout = function() {
		console.log("Logging out " + angular.toJson($rootScope.authorisedOwner));
		SecurityService.logout();
	}

	$rootScope.logMyAction = function(actionType, element) {
		log.console("Logging user action: ");
	}
} 

function ProjectsController($scope, ProjectResource) {
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

	$scope.logAction = function() {
		UserActionResource.log({id: '1'});
	}
	
	$scope.getCompanies();
}
	
function ProjectDetailsController($scope, $routeParams, ProjectResource) {
	$scope.project = ProjectResource.get({id: $routeParams.id});

}

function DialogController($scope, $rootScope) {
	if (!$rootScope.dialogs) {
		$rootScope.dialogs = {};
		$rootScope.dialogs['LoginSignup'] = $('#eb_must_login_dialog');
	}
	
	$scope.closeDialog = function(name) {
		if (name && $scope.dialogs[name]) {
			$scope.dialogs[name].dialog("close");
		}
	}

	$scope.closeLoginSignupDialog = function() {
		if ($scope.dialogs['LoginSignup']) {
			$scope.dialogs['LoginSignup'].dialog("close");
		}
	}

}
