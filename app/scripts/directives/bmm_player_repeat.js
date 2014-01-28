'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerRepeat', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-player-repeat');

      }
    };
  }]);