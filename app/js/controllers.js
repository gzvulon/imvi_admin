'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('Ctrl', function($scope) {
	$scope.user = {
		name: 'awesome user'
	};
});

flickrfeedControllers.controller('Navbar',
	function ($scope, $location, Tagger) {
		$scope.tag = Tagger;
		console.log($location.path() + " and " +  !/^\/feed\//.test($location.path()))
		$scope.disableSearch = function() 
			{
				return !/^\/feed\//.test($location.path());
			};
	});

flickrfeedControllers.controller('FeedListCtrl',
	function ($scope, $http, $routeParams, $location, Tagger) {
		$scope.tag = Tagger;
		$scope.loading = true;
		$scope.emptylist = false;
		$scope.tag.text = $routeParams.tag;



		$scope.loading = true;
		$scope.emptylist = false;

		console.log("v");
		$http.get('http://develop.balerion.im:8000/api/contents').then(function successCallback(response) {
			console.log(response);
			for(var i=0; i<response.data.length; ++i){
				var el = response.data[i];
				el.showVideo = false
			}
			$scope.feed = {items:response.data};

			// this callback will be called asynchronously
			// when the response is available
		}, function errorCallback(response) {
			console.log("e");
			console.log(response);

			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

		$scope.showImage = function (el){
			el.showVideo = true;
		};
	});

flickrfeedControllers.controller('RadiolistCtrl', function($scope, $filter) {
	$scope.user = {
		status: 2
	};

	$scope.statuses = [
		{value: 1, text: 'status1'},
		{value: 2, text: 'status2'}
	];

	$scope.showStatus = function() {
		var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
		return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
	};
});


flickrfeedControllers.controller('ExampleController',
	['$scope', '$http', function($scope, $http) {
	$scope.userform = {
		status: 'blue',
		tags: {
			"Funny": true,
			"Temporal": false
		},
		rank: 1,
		language: "Global"
	};
	$scope.specialValue = {
		"id": "12345",
		"value": "green"
	};
	// $scope.scheme = {
	// 	statuses: [
	// 		'Approved','Declined','Reported'
	// 	]
	// };

	// $http.get('http://develop.balerion.im:8000/api/scheme').then(function successCallback(response) {
	// 	console.log(response);
	// 	$scope.scheme = response;
	// });
	$scope.scheme = {
		"copy_rights": ["Watermark", "Professional", "UserGenerated"],
		"objectionable": ["Violence", "Porn", "Sensitive", "Rude"],
		"user_channels": ["Funny", "News", "Animals", "Sports", "Music", "Food", "Travel", "Fashion", "Religion", "Accidents", "Disasters", "Art", "Temporal"],
		"languages": ["Global", "English", "Hebrew", "Russian", "Spanish", "Portuguese", "Arabic"],
		"ranks": ["1", "2", "3", "4", "5"],
		"statuses": ["Approved", "Declined", "Pending", "Unknown", "Uploaded", "Reported"]
	}
}]);