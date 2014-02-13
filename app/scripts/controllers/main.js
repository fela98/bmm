'use strict';

angular.module('bmmDebug')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.go = function () {
      console.log('click');
    };

    $scope.videoSlider = [
      {title: ''},
      {title: ''},
      {title: ''}
    ];

  });
