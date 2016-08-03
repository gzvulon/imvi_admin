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



		$scope.$watch('tag.text', function()
			{
				$scope.loading = true;
				$scope.emptylist = false;
				var newTag = $scope.tag.text;
				$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag.text + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
					//if ($scope.tag.text === newTag) {
					//	$scope.loading = false;
					//	$scope.feed = data;
					//	if ($scope.feed.items.length === 0) {
					//		$scope.emptylist = true;
					//	}
					//	// avoid text to be inserted when we empty tthe input field
					//	if ($scope.tag.text !== ""){
					//		$location.path("/feed/" + $scope.tag.text);
					//	}
					//}
				});
                console.log("v");
                $http.get('http://develop.balerion.im:8000/api/contents').then(function successCallback(response) {
                    console.log("s");
                    console.log(response);
					var items = [];
					for(var i=0; i<response.data.length; ++i){
						var el = response.data[i];
						items.push({
							link: el.cdnUrl,
							src: el.thumbnailUrl,
							title: el.title,
							showVideo : false
						})
					}
					$scope.feed = {items:items};

                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    console.log("e");
                    console.log(response);

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

				$scope.showImage = function (p){
					p.showVideo = true;
				};


			});	
	});

flickrfeedControllers.controller('FeedPostCtrl',
	function ($scope, $routeParams, $http, $sce, Tagger) {
		$scope.tag = Tagger;
		$scope.tag.text = $routeParams.tag;
		$scope.loading = true;
		$scope.notfound = false;
		$scope.author = $routeParams.author;
		$scope.postId = $routeParams.postId;
		// make the input not edidsf=p[edofklns npjoedfkpl[table
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag.text + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
			$scope.feed = data;
			for (var post in data.items) {
				if (data.items[post].link == "http://www.flickr.com/photos/"+ $routeParams.author +"/"+ $routeParams.postId +"/"){
					$scope.post = data.items[post];

					//generate the description
					var descrPatt = /<p>.+<p>.+<p>(.+)<\/p>/;
					var extract = descrPatt.exec($scope.post.description);
					if (extract == null) {
						$scope.description = $sce.trustAsHtml("<i>No descritption available for this picture</i>");
					} else {
						$scope.description = $sce.trustAsHtml(extract[1]);
					}

					break;
				}
			};

			$scope.loading = false;
			if ($scope.post === undefined) {
				$scope.notfound = true;
			}
		});

		$scope.back = function() 
			{
		    	window.history.back();
		  	};
	});