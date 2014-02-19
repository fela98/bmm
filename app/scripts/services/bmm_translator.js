'use strict';

angular.module('bmmLibApp')
  .factory('bmmTranslator', function () {
    
    var factory = {}, translation = {};

    factory.get = function() {
      return translation;
    };

    factory.set = function(t) {
      translation = t;
    };

    return factory;

  });
