'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerPlay', ['bmmPlayer', function (bmmPlayer) {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-play');

        scope.$watch('bmmPlayer.getPlaying', function(state) {
          if (state) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });

        element.click(function() {

          if (!element.hasClass('active')) {
            bmmPlayer.setPlay();
          } else {
            bmmPlayer.setPause();
          }

        });

        /*
        $(window).unbind('keyup');
        $(window).bind('keyup', function(e) {
          if (e.keyCode === 32) {
            if (!element.hasClass('active')) {
              //bmmPlayer.setPlay(); @todo - fix when player is active
            } else {
              //bmmPlayer.setPause();
            }
          }
        });
        */

      }
    };
  }]);