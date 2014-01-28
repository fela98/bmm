'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerClock', function () {
    return {
      link: function postLink(scope, element) {
        element.addClass('bmm-player-clock');

        var initialize = function() {

        };

        initialize();

      }
    };
  });
