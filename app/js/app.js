'use strict';

var app = angular.module("app", ["xeditable"]);

var flickrfeedApp = angular.module('flickrfeedApp', [
  'flickrfeedControllers',
  'flickrfeedFilters',
  'ngRoute',
  'ngAnimate',
  'xeditable'
]);

//app.run(function(editableOptions) {
//    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//});

flickrfeedApp.factory('Tagger', function(){
  return {text:''};
});

flickrfeedApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
      when('/feed/:tag', {
        templateUrl: 'templates/flickr-feed.html',
        controller: 'FeedListCtrl'
      }).
      otherwise({
        redirectTo: '/feed/potato'
      });
  }]);