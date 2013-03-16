'use strict';

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
		$scope.projectRows = splitIntoRows($scope.projects, 3);
	});
}

function ProjectController($scope, ProjectResource, $http) {
	$scope.newProject = {};
	
	$scope.addProject = function() {
		if (!$scope.newProject.status) {
			$scope.newProject.status = 'PENDING';
		}
		
		angular.uppercase($scope.newProject.status);
		$scope.newProject.company = {
				id: "12345",
				name: 'A really cool one'
		}
		
		if ($scope.opportunities) {
			$scope.newProject.opportunities = [];
			angular.forEach($scope.opportunities, function(opportunity, index) {
				$scope.newProject.opportunities.push({id: '' + $scope.newProject.id + '' + index, name: opportunity});	
			});
		}
		
		ProjectResource.save($scope.newProject);
	}
	
	$scope.clear = function() {
		$scope.newProject = {};	
	}
	
	$scope.getImageSrc = function() {
		if (!$scope.project.imageName) {
			return "/app/img/photo-main-default.jpg";
		} else {
			return "/app/img/" + $scope.project.id + "/photo-main.jpg";
		}
	}
}