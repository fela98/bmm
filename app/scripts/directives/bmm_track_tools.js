'use strict';

angular.module('bmmLibApp')
  .directive('bmmTrackTools', [function () {
    return {
      template: '<div bmm-track-favorite></div>'+
                '<div bmm-track-timer></div>'+
                '<div bmm-track-share></div>'+
                '<a download href="{{file}}"><div bmm-track-download></div></a>'+
                '<div bmm-player-video></div>',
      link: function postLink(scope, element) {
        
        element.addClass('bmm-track-tools');

      }
    };
  }]);