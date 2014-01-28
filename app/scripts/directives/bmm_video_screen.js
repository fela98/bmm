'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoScreen', [function () {
    return {
      template: '<div bmm-video-fullscreen></div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //PRESET
            element.addClass('bmm-video-screen');

          }
        };
      }
    };
  }]);