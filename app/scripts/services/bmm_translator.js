'use strict';

angular.module('bmmLibApp')
  .factory('bmmTranslator', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });