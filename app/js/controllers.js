'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);
var server_base_url = '//develop.balerion.im';

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
	function ($scope, $http, $routeParams, $location, Tagger, balerionDataService) {
		$scope.tag = Tagger;
		$scope.loading = true;
		$scope.tag.text = $routeParams.tag;
		$scope.emptylist = false;

		console.log("feed list ctrl: ");
		console.log($scope.tag.text);

		$scope.$watch('tag.text', function() {
			var url = server_base_url + '/api/admin/' + $scope.tag.text;
			$http.get(url).then(function successCallback(response) {
				$scope.loading = false;
				console.log(response);
				for (var i = 0; i < response.data.length; ++i) {
					var el = response.data[i];
					el.showVideo = true;
					el.form = {
						title: el.title,
						tags: el.tags,
						state: el.state
					};
					el.videoSrc = "";
				}
				$scope.feed = {items: response.data};

				// this callback will be called asynchronously
				// when the response is available
			}, function errorCallback(response) {
				console.log("e");
				console.log(response);

				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		});

		$scope.showImage = function (el){
			el.showVideo = true;
		};

		balerionDataService.getScheme().success(function (response) {
			//Dig into the response to get the relevant data
			$scope.scheme = response;
			console.log("got scheme!");
			console.log(response);
		});

	});


flickrfeedControllers.controller('ExampleController',
	['$scope', '$http', function($scope, $http) {
	$scope.init = function(el, scheme) {
		$scope.userform = {
			client_id: 'xxxroei',
			state: el.state,
			title: el.title,
			language: el.language,
			rank: el.rank,
			tags: {}
		};
		var tag_name = "";

		if (scheme) {
			for (var i = 0; i < scheme.user_channels.length; ++i) {
				tag_name = scheme.user_channels[i];
				$scope.userform[tag_name] = el.tags.includes(tag_name);
			}
		}

		function addTagsToScope(tags) {
			for(var j=0; j <tags.length; ++j){
				tag_name = tags[j];
				if (el.tags.includes(tag_name)) {
					$scope.userform.tags[tag_name] = true;
				}
			}
		}
		addTagsToScope(scheme.objectionable);
		addTagsToScope(scheme.copy_rights);

		// $scope.tags[tag] =
	};
	// calling our submit function.
	$scope.submitForm = function(el) {
		var url = server_base_url + '/api/content';
		var data = $scope.userform; //forms user object
		data.contentId = el.contentId;
		console.log("Send data to server...");
		console.log(data);
		// Posting data to php file
		$http({
			method  : 'POST',
			url     : url,
			data    : data
			// headers : {'Content-Type': 'application/json'}
		})
			.success(function(response) {
				if (response.errors) {
					// Showing errors.
					console.log(response);
					$scope.errorName = response.errors.name;
					$scope.errorUserName = response.errors.username;
					$scope.errorEmail = response.errors.email;
				} else {
					$scope.message = response.message;
				}
			})
			.error(function errorCallback(response) {
				console.log("e");
				console.log(response);

				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};
}]);
