'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerShuffle', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-shuffle');

      }
    };
  }]);