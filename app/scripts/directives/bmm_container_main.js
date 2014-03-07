'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerMain', ['$timeout', function ($timeout) {
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

            if($(window).width() <= 500) {
              scope.miniScreen = true;
              $timeout(function() {
                $timeout(function() {
                  $(window).trigger('resize');
                });
              });
            }

            $(window).resize(function() {
              if($(window).width() <= 500) {
                scope.miniScreen = true;
              } else {
                scope.miniScreen = false;
              }
            });

            $('.bmm-player-target').scroll(function() {
              if (!$('.bmm-navigator-switch').hasClass('fixed')&&
                  $('.bmm-player-target').scrollTop()>=$('.bmm-container-header').height()) {
                $('.bmm-navigator-switch').addClass('fixed');
              } else if ($('.bmm-navigator-switch').hasClass('fixed')&&
                  $('.bmm-player-target').scrollTop()<$('.bmm-container-header').height()) {
                $('.bmm-navigator-switch').removeClass('fixed');
              }
            });
            
          }
        };
      }
    };
  }]);