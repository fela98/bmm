'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerPrevious', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-previous');

      }
    };
  }]);