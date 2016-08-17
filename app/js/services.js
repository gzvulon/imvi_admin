'use strict';

var flickrfeedServices = angular.module('flickrfeedServices', []);

flickrfeedServices.factory('balerionDataService', ['$http', function ($http) {

    var urlBase = 'http://develop.balerion.im';

    var balerionDataService = {};

    balerionDataService.getScheme = function () {
        return $http.get(urlBase+'/api/scheme');
    };

    return balerionDataService;

}]);

//var flickrfeedServices = angular.module('flickrfeedServices', []);
//
// angular.module('flickrfeedServices', []).
//     factory('balerionDataService', function($http) {
//
//         var balerionAPI = {};
//
//         balerionAPI.getScheme = function() {
//             return $http({
//                 method: 'JSONP',
//                 url: ''
//             });
//         }
//
//         return balerionAPI;
//     });
