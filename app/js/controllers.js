'use strict';

function ProjectsController($scope) {
	$scope.projects = [ {
		id : 1,
		name : 'My Project 1',
		description : 'Description 1'
	}, {
		id : 2,
		name : 'My Project 2',
		description : 'Description 2'
	}, {
		id : 3,
		name : 'My Project 3',
		description : 'Description 3'
	}, 
	{
		id : 4,
		name : 'My Project 4',
		description : 'Description 4'
	}, {
		id : 5,
		name : 'My Project 5',
		description : 'Description 5'
	}, {
		id : 6,
		name : 'My Project 6',
		description : 'Description 6'
	}];

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
		$scope.newProject.status = 'PENDING';
		$scope.newProject.company = {
				id: "12345",
				name: 'A really cool one'
		}
		//ProjectResource.save($scope.newProject);
		
		$http.post('http://127.0.0.1:8680/edgebud/projects', $scope.newProject);
	}
	
	$scope.clear = function() {
		$scope.newProject = {};	
	}
}