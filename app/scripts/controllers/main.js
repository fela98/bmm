'use strict';

angular.module('bmmDebug')
  .controller('MainCtrl', function ($scope, $timeout, $filter) {
    
    //$scope.bibleSolved = $filter('bmmBibleVerse')($scope.bible);

    $scope.$watch('bible', function(text) {
      $scope.bibleSolved = $filter('bmmBibleVerse')(text);
    });

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

    $scope.playlist = [
      {nr: 1, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor spsuor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum Lorem ipsu doset'},
      {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
      {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'}
    ];

  });
