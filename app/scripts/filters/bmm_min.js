'use strict';

angular.module('bmmLibApp')
  .filter('bmmMin', function () {
    return function (str, size) {

      if (str.length>size) {
        str = str.substring(0,size)+'...';
      }

      return str;

    };
  });
