'use strict';

angular.module('bmmLibApp')
  .directive('bmmVolumeMax', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-volume-max');

      }
    };
  }]);