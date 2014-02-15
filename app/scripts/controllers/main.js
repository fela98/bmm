'use strict';

angular.module('bmmDebug')
  .controller('MainCtrl', function ($scope, $timeout) {
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

    $timeout(function() {

      $scope.vid = [
        {title: ''},
        {title: ''},
        {title: ''},
        {title: ''},
        {title: ''}
      ];

    },1500);


  });
