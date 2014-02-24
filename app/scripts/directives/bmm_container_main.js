'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerMain', [function () {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //PRESET
            element.addClass('bmm-container-main');

            $(element).bind('scroll', function() {
              if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
                $('.bmm-view').trigger('scrollBottom');
              }
            });

            $(element.find('.bmm-view')).bind('scroll', function() {
              if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
                $('.bmm-view').trigger('scrollBottom');
              }
            });
            
          }
        };
      }
    };
  }]);