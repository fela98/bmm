'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerNext', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-next');

      }
    };
  }]);