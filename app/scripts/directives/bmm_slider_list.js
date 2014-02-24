'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderList', ['$timeout', function ($timeout) {
    return {
      link: function postLink(scope, element) {

        var initialize;

        //This solution doesnt work perfectly here @todo - see end
        if (element.children().length) {

          initialize();

        } else {

          $timeout(function() {
            initialize();
          }, 1000);

        }
        //End @todo - find autoupdate solution for this

        initialize = function() {

          element.addClass('bmm-slider-list');
          element.find('> div:first-child').addClass('active');
          element.append('<div class="bullets"></div>');

          element.children().each(function() {
            if (!$(this).hasClass('bullets')) {
              element.find('.bullets').append('<div></div>');
            }
          });

          element.find('.bullets div:first-child').addClass('active');

          element.find('.bullets').children().each(function() {

            $(this).click(function() {

              element.children().removeClass('active');
              element.find('.bullets').children().removeClass('active');

              element.find('> div:nth-child('+($(this).index()+1)+')').addClass('active');
              element.find('.bullets > div:nth-child('+($(this).index()+1)+')').addClass('active');

            });

          });

          if (element.parent().width()<500) {
            element.width('100%');
          } else {
            element.width('');
          }

          $(window).resize( function() {

            if (element.parent().width()<500) {
              element.width('100%');
            } else {
              element.width('');
            }

          });

        };

      }
    };
  }]);