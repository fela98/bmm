'use strict';

angular.module('bmmDebug', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'bmmLibApp',
  'ui.sortable',
  'angularTreeview'
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
      .when('/bmm_api', {
        templateUrl: 'views/previews/bmm_api.html',
        controller: 'ApiCtrl'
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
