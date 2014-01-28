'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoScreen', function ($timeout) {
    return {
      template: '<div bmm-video-fullscreen></div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS
            var fullscreen;

            //PRESET
            element.addClass('bmm-video-screen');

            //INITIALIZE
            $timeout(function() {
              fullscreen = element.find('.bmm-video-fullscreen');

              $(window).resize(function() {

              });
            });
            
          }
        };
      }
    };
  });