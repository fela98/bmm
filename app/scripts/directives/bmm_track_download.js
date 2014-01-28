'use strict';

angular.module('bmmLibApp')
  .directive('bmmTrackDownload', function () {
    return {
      link: function postLink(scope, element) {
        element.addClass('bmm-track-download');

        var initialize = function() {

        };

        initialize();

      }
    };
  });
