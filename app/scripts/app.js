'use strict';

angular.module('bmmDebug', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'bmmLib'
]).run(['$route', function($route)  {
    $route.reload();
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pages/directives.html',
        controller: 'MainCtrl'
      })
      .when('/bmm_player_about', {
        templateUrl: 'views/previews/bmm_player_about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
