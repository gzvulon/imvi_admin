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
			console.log("s");
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