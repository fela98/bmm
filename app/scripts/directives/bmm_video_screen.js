'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoScreen', [ 'bmmPlayer', function (bmmPlayer) {
    return {
      template: '<div class="bmm-video-target">'+
                  '<div bmm-video-fullscreen></div>'+
                '</div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //PRESET
            element.addClass('bmm-video-screen');

            element.click(function() {

              bmmPlayer.setFullscreen();

            });

          },
          post : function() {

            bmmPlayer.initialize('.bmm-video-target');

          }
        };
      }
    };
  }]);