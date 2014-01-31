'use strict';

angular.module('bmmDebug', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'bmmLibApp'
]).run(['$route', function($route)  {
    
    $route.reload();

  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pages/directives.html',
        controller: 'MainCtrl'
      })
      .when('/bmm_main', {
        templateUrl: 'views/previews/bmm_main.html',
      })
      .when('/bmm_player_controller', {
        templateUrl: 'views/previews/bmm_player_controller.html',
      })
      .when('/bmm_player_about', {
        templateUrl: 'views/previews/bmm_player_about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
