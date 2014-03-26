'use strict';

angular.module('bmmLibApp')
  .filter('bmmFilePath', function (bmmApi) {
    return function (path) {

      if (path.substring(0,4)!=='http') {
        path = bmmApi.getserverUrli()+'file/protected/'+path;
      }

      return path;
    };
  });