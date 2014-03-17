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
              $timeout(function() {
                $timeout(function() {
                  $(window).trigger('resize');
                });
              });
            }

            var minified = false;
            $(window).resize(function() {
              if($(window).width()<=500&&!minified) {

                minified = true;
                scope.miniScreen = true;

              } else if (minified&&$(window).width()>500) {

                minified = false;
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
              if (!$('.bmm-navigator-switch-swipe').hasClass('fixed')&&
                  $('.bmm-player-target').scrollTop()>=$('.bmm-container-header').height()+
                                                       $('.bmm-navigator-playlist').height()) {
                $('.bmm-navigator-switch-swipe').addClass('fixed');
              } else if ($('.bmm-navigator-switch-swipe').hasClass('fixed')&&
                  $('.bmm-player-target').scrollTop()<$('.bmm-container-header').height()+
                                                      $('.bmm-navigator-playlist').height()) {
                $('.bmm-navigator-switc-swipe').removeClass('fixed');
              }
            });
            
          }
        };
      }
    };
  }]);