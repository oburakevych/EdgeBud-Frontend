'use strict';

function IssueListController($scope, $rootScope, IssueService) {
	$scope.currentDistance = 100; // Defgault distance in Km
	$scope.currentLocation = {};
	
	$scope.getCurrentLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.currentLocation = {};
				$scope.currentLocation.latitude = position.coords.latitude;
				$scope.currentLocation.longitude = position.coords.longitude;
				
				console.debug("Setting location to: " + $scope.currentLocation.latitude + "," + $scope.currentLocation.longitude);
				
				$scope.getIssues();
			});
		}
	}
	
	// Monitoring current location
	$scope.$watch(function() {
		console.debug("Checking Current location " + $scope.currentLocation);
		return $scope.currentLocation;
		}, function() {return 0;}
	, false);
	
	$scope.getIssues = function() {
		console.debug("Current location updated to: " + $scope.currentLocation);
		
		if ($scope.currentLocation && $scope.currentLocation.latitude && $scope.currentLocation.longitude) {
			var where = {
				"location": {
					"$nearSphere": {
						"__type": "GeoPoint",
						"latitude": $scope.currentLocation.latitude,
						"longitude":  $scope.currentLocation.longitude
					},
					"$maxDistanceInKilometers": $scope.currentDistance 
				}
			};
			
			where = JSON.stringify(where);
			
			console.log(where)
			//where = encodeURIComponent(where);
			console.log(where);
			
			$scope.issueList = IssueService.get({where: where});
		}
	}
	
	$scope.distance = function(distance) {
		var issueList = IssueService.get({order: '-createdAt'}, function() {
			console.debug("List of issues updated with distance around you: " + distance);
			$scope.issueList = issueList; 
		});
	}
	
	$scope.getCurrentLocation();
}

function CreateIssueController($scope, $rootScope, IssueService) {
	
}

function IssueController() {
	
}

function MapController($scope, $rootScope, MapService, IssueService, $timeout) {
	$scope.issueList = IssueService.get({}, function() {
		// Load locations to the map on successful response
		$timeout($scope.showIssues, 200, true);
	});
		
	$scope.getBoundariesForAllIssues = function() {
		var boundaries = {
				left: 0,
				bottom: 0,
				right: 0,
				top: 0
		};
		
		if ($scope.issueList) {
			angular.forEach($scope.issueList.results, function(issue, index) {
				
				if (issue.location) {
					if (issue.location.latitude < boundaries.left) {
						boundaries.left = issue.location.latitude; 
					}
					
					if (issue.location.latitude > boundaries.right) {
						boundaries.right = issue.location.latitude; 
					}
					
					if (issue.location.longitude < boundaries.bottom) {
						boundaries.bottom = issue.location.longitude; 
					}
					
					if (issue.location.longitude > boundaries.top) {
						boundaries.top = issue.location.longitude; 
					}
				}
			});
		}
		
		return boundaries;
	}
	
	$scope.getBoundries = function(issues)
	{
		var minLat = NaN, maxLat = NaN, minLng = NaN, maxLng = NaN;

		angular.forEach(issues, function(issue, index)
		{
			var lat = issue.location.lat;
			var lng = issue.location.lng;
			var location = new google.maps.LatLng(lat, lng);
			
			if(isNaN(minLat) || lat < minLat) minLat = lat;
			if(isNaN(minLng) || lng < minLng) minLng = lng;
			if(isNaN(maxLat) || lat > maxLat) maxLat = lat;
			if(isNaN(maxLng) || lng > maxLng) maxLng = lng;
		});

		return {"minLat":minLat, "minLng":minLng, "maxLat":maxLat, "maxLng":maxLng};
	}
	
	$scope.showIssues = function ()
	{
		var issues = $scope.issueList.results;
		var markers = [];

		var boundries = $scope.getBoundries(issues);
		var mostSouthWest = new google.maps.LatLng(boundries.minLat, boundries.minLng);
		var mostNorthEast = new google.maps.LatLng(boundries.maxLat, boundries.maxLng);
		var bounds = new google.maps.LatLngBounds(mostSouthWest,  mostNorthEast);
		var centreOfEvents = new google.maps.LatLng((boundries.minLat + boundries.maxLat)/2, (boundries.minLng + boundries.maxLng)/2)

		var infoWindow = new google.maps.InfoWindow();

		angular.forEach(issues, function(issue, index) 
		{
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(issue.location.latitude, issue.location.longitude),
				title: issue.name
			});

			google.maps.event.addListener(marker, 'click', function(event) {
				var html = '<p><strong>Issue:</strong> ' + issue.name + "</p>" +
					"<p>Category: " + issue.category + "</p>" + 
					"<p>Impact: " + issue.impact + "</p>";
				infoWindow.setContent(html);
				infoWindow.setPosition(event.latLng);
				infoWindow.open(map);
			});

			markers.push(marker);
		});

  		// draw map
		var mapOptions = {
			zoom: 6,
			center: centreOfEvents,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		map.fitBounds(bounds);
		angular.forEach(markers, function(marker, index)
		{
			marker.setMap(map);
		});
	  }
}