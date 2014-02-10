'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderImage', ['bmmIndex', function(bmmIndex) {
    return {
      template: '<div class="image-left"></div>'+
            '<div class="image-right"></div>'+
            '<ul class="advert"></ul>',
      link: function postLink(scope, element, attrs) {

        var adverts = [], advert;

        scope.$watch(function() {

          if (attrs.bmmAdvert!==adverts) {

            adverts = attrs.bmmAdvert;
            element.find('ul').empty();

            $.each($.parseJSON(adverts), function() {

              advert = '<li></li>';
              element.find('ul').append(advert);

            });

            initialize();

          }

        });

        var initialize = function() {

          var idx = 1, ndx,
            mdx = element.find('li').length;

          element.css({
            width: '74%',
            marginLeft: '2%',
            height: '8.5em',
            display: 'inline-block',
            overflow: 'hidden',
            marginTop: '2.5em',
            position: 'relative'
          });

          element.find('ul, li').css({
            width: '100%',
            height: '100%',
            position: 'absolute'
          });

          element.find('li').hide();
          element.find('li:first').show();

          element.find('.image-left').click(function() {

            ndx = bmmIndex.prev(idx, mdx, 1, 1);
            
            element.find('li:nth-child('+ndx+')').css({
              zIndex: 0
            }).fadeIn('fast');

            element.find('li:nth-child('+idx+')').css({
              zIndex: 1
            }).fadeOut('fast');

            idx = ndx;

          });

          element.find('.image-right').click(function() {

            ndx = bmmIndex.next(idx, mdx, 1, 1);
            
            element.find('li:nth-child('+ndx+')').css({
              zIndex: 0
            }).fadeIn('fast');

            element.find('li:nth-child('+idx+')').css({
              zIndex: 1
            }).fadeOut('fast');

            idx = ndx;

          });

        };

      }
    };
  }]);
