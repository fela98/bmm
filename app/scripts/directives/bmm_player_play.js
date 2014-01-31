'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerPlay', ['bmmPlayer', function (bmmPlayer) {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-play');

        element.click(function() {

          if (!element.hasClass('active')) {
            bmmPlayer.setPlay();
            element.addClass('active');
          } else {
            bmmPlayer.setPause();
            element.removeClass('active');
          }

        });

      }
    };
  }]);