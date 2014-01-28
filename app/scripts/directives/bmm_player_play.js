'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerPlay', function () {
    return {
      link: function postLink(scope, element) {
        element.addClass('bmm-player-play');

        var initialize = function() {

        };

        initialize();

      }
    };
  });
