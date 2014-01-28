'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerMain', function ($timeout) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //PRESET
            element.addClass('bmm-container-main');

            //INITIALIZE
            $timeout(function() {

              $(window).resize(function() {

              });
            });
            
          }
        };
      }
    };
  });