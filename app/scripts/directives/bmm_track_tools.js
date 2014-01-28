'use strict';

angular.module('bmmLibApp')
  .directive('bmmTrackTools', function () {
    return {
      template: '<div bmm-track-favorite></div>'+
                '<div bmm-track-timer></div>'+
                '<div bmm-track-share></div>'+
                '<div bmm-track-download></div>',
      link: function postLink(scope, element) {
        element.addClass('bmm-track-tools');

        var initialize = function() {

        };

        initialize();

      }
    };
  });
