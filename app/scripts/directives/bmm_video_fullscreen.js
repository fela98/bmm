'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoFullscreen', function ($timeout) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS

            //PRESET
            element.addClass('bmm-video-fullscreen');

            //INITIALIZE
            $timeout(function() {

            });
            
          }
        };
      }
    };
  });