'use strict';

angular.module('bmmLibApp')
  .directive('bmmVolumeMute', function () {
    return {
      link: function postLink(scope, element) {
        element.addClass('bmm-volume-mute');

        var initialize = function() {

        };

        initialize();

      }
    };
  });
