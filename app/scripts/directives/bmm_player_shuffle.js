'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerShuffle', ['bmmPlaylistDemo', function (bmmPlaylistDemo) {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-shuffle');

        element.click(function() {
          if (!element.hasClass('active')) {
            bmmPlaylistDemo.setShuffle(true);
            element.addClass('active');
          } else {
            bmmPlaylistDemo.setShuffle(false);
            element.removeClass('active');
          }
        });

      }
    };
  }]);