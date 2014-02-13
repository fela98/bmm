'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderList', [function () {
    return {
      link: function postLink(scope, element) {

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

        $(window).resize( function() {

          if (element.parent().width()<600) {
            element.width('100%');
          } else {
            element.width('');
          }

        });


      }
    };
  }]);