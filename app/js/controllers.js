'use strict';

function TopBannerController($scope, $rootScope) {
	$rootScope.showHero = true;
}

function IntroController($scope, $rootScope, ProjectResource) {
	$scope.exampleProject = ProjectResource.getExample();
}

function SignupController($scope, $rootScope, $timeout, SecurityService) {
	$scope.account = {
		type: 'STANDARD',
		owner: {}
	}
	$scope.signup = function(successFn, errorFn) {
		console.log("Signup " + angular.toJson($scope.account));
		SecurityService.signup($scope.account, $scope, successFn, errorFn);
	}
}

function UserSignupLoginController($scope, $rootScope, $cookieStore, $timeout, SecurityService, jqueryUI) {
	$scope.haveAccount = false;
	$scope.account = {
		type: 'STANDARD',
		owner: {}
	}

	$scope.showLoginSignupDialog = function() {
		jqueryUI.activateDialog($rootScope.dialogs['LoginSignup'], 'Welcome to LiveStormer Beta');
	}
	
	$scope.signup = function(successFn, errorFn) {
		console.log("Signup " + angular.toJson($scope.account));
		SecurityService.signup($scope.account, $scope, successFn, errorFn);
	}

	$scope.login = function(successFn, errorFn) {
		console.log("Login " + angular.toJson($scope.account.owner));
		SecurityService.login($scope.account.owner, $scope, successFn, errorFn);
	}

	$scope.autoLogin = function() {
		if (!$rootScope.authorisedAccount) {
			var userCookie = $cookieStore.get("EB_LOGGED_USER");
			if (userCookie) {
				SecurityService.login(userCookie);
			} else {
				// Signup is on the intro-stripe
				//$timeout($scope.showLoginSignupDialog, 200, true);
			}

			$timeout(function() {$rootScope.autologinAttempted = true;}, 1800, true);
		}
	}

	$scope.logout = function() {
		console.log("Logging out " + angular.toJson($rootScope.authorisedAccount));
		SecurityService.logout();
	}

	$rootScope.logMyAction = function(actionType, element) {
		log.console("Logging user action: ");
	}

	$scope.afterUserLoggedIn = function() {
		console.log("LoginSignupUserController: After user logged In");
		$rootScope.showHero = false;
	}
	
	$scope.$on('event:show-login-signup-dialog', function() {
		$scope.showLoginSignupDialog();		
	});

	$scope.$on('event:after-user-logged-in', $scope.afterUserLoggedIn);

	$timeout($scope.autoLogin, 0, true);
} 

function ProjectsController($scope, $rootScope, ProjectResource, AccountResource) {
	$scope.projects = ProjectResource.query();

	var splitIntoRows = function(array, columns) {
		if (array.length <= columns) {
			return [ array ];
		}

		var rowsNum = Math.ceil(array.length / columns);

		var rowsArray = new Array(rowsNum);

		for ( var i = 0; i < rowsNum; i++) {
			var columnsArray;
			if (rowsNum - 1 === i) {
				// if last row, check if all columns should be used
				var numOfLastColumns = array.length % columns;
				console.log("numOfLastColumns = " + numOfLastColumns);
				columnsArray = new Array(numOfLastColumns);
			} else {
				columnsArray = new Array(columns);
			}
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
		$scope.projectRows = splitIntoRows($scope.projects, 4);
	}, true);

	$scope.$on('event:after-user-logged-in', function() {
		console.log("ProjectsController: After user logged In");
		$rootScope.projectBookmarks = AccountResource.getBookmarks({accountId: $rootScope.authorisedAccount.id});
	});
}

function ProjectController($scope, $rootScope, UserActionResource, ProjectResource, CopmaniesResource, SecurityService, AccountResource) {
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

	$scope.bookmark = function() {
		if ($rootScope.authorisedAccount && $rootScope.authorisedAccount.id) {
			var bookmark = {
				accountId: $rootScope.authorisedAccount.id,
				objectType: 'OPPORTUNITY',
				objectId: $scope.project.id
			}

			if ($scope.project.isBookmarked) {
				$scope.project.isBookmarked = false;
				AccountResource.removeBookmark(bookmark, function() {}, function() {
					//ERROR
					$scope.project.isBookmarked = true;
				});
			} else {
				$scope.project.isBookmarked = true;
				AccountResource.addBookmark(bookmark, function() {}, function() {
					//Error
					$scope.project.isBookmarked = false;
				});
			}
		}
	}

	$scope.getBookmarkClass = function() {
		if ($scope.project.isBookmarked) {
			return 'bookmarked';
		} else {
			return 'unbookmarked';
		}
	}

	$rootScope.$watch('projectBookmarks', function() {
		var isBookmarked = false;
		if ($rootScope.projectBookmarks && $rootScope.projectBookmarks.length > 0) {
			for(var i = 0; i < $rootScope.projectBookmarks.length; i++) {
				if ($rootScope.projectBookmarks[i].objectId === $scope.project.id) {
					isBookmarked = true;
					break;
				}
			};
		}

		$scope.project.isBookmarked = isBookmarked;
	}, true);

	$scope.getCompanies();
}
	
function ProjectDetailsController($scope, $rootScope, $routeParams, ProjectResource, ProjectDetailsResource) {
	$rootScope.showHero = false;
	$scope.project = ProjectResource.get({projectId: $routeParams.id}, function() {
		$scope.project.details = ProjectDetailsResource.get({projectId: $routeParams.id});
	});

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
			owner: $rootScope.authorisedAccount.owner,
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

function AccountCompletenessController($scope, $rootScope, $timeout, AccountCompletenessTaskResource) {
	$scope.getAccountCompleteness = function() {
		if ($rootScope.authorisedAccount && $rootScope.authorisedAccount.id) {
			console.log("Get completeness");
			AccountCompletenessTaskResource.get({accountId: $rootScope.authorisedAccount.id}, function(data) {
				$scope.accountCompleteness = data;
			});
			$timeout($scope.getAccountCompleteness, 4000, true);
		} else {
			console.warn('User is not authorised properly');
		}
	}

	$timeout($scope.getAccountCompleteness, 0, true);

	$scope.getCompletenessClass = function(taskCompleteness) {
		if (taskCompleteness.isCompleted) {
			return 'task-completed';
		} else{
			return 'task-uncompleted';
		}
	}

	$scope.getProgressWidth = function(rate) {
		var style = {
			width: "'" + rate + "%'"
		}

		return style;
	}
}