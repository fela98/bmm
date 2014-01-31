'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerRepeat', ['bmmPlaylistDemo', function (bmmPlaylistDemo) {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-repeat');

        element.click(function() {
          if (!element.hasClass('active')) {
            bmmPlaylistDemo.setRepeat(true);
            element.addClass('active');
          } else {
            bmmPlaylistDemo.setRepeat(false);
            element.removeClass('active');
          }
        });

      }
    };
  }]);