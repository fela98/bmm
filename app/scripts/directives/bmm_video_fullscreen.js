'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoFullscreen', [function () {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //PRESET
            element.addClass('bmm-video-fullscreen');
            
          }
        };
      }
    };
  }]);