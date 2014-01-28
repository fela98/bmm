'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerMain', [function () {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //PRESET
            element.addClass('bmm-container-main');
            
          }
        };
      }
    };
  }]);