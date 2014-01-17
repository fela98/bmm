'use strict';

angular.module('bmmLib')
  .directive('bmmPlayerAbout', function () {
    return {
      template: '<div class="bmm-player-thumbnail"></div>'+
				'<div class="bmm-player-title"></div>'+
        '<div class="bmm-player-subtitle"></div>'+
        '<div class="bmm-player-extra"></div>',
      link: function postLink(scope, element, attrs) {

        var initialize = function() {
          if (typeof attrs.thumbnail!=='undefined') {
            element.find('.bmm-player-thumbnail').css({
              background: 'url("'+attrs.thumbnail+'")'
            });
          }

          element.find('.bmm-player-title').append(attrs.title);
          element.find('.bmm-player-subtitle').append(attrs.subtitle);
          element.find('.bmm-player-extra').append(attrs.extra);
          element.css({
            overflow: 'hidden'
          });
          checkMinified();

          $(window).resize(function() {
            
            checkMinified();

          });
        };

        var checkMinified = function() {

          if (element.hasClass('bmm-minified')) {
            element.height('auto');
          } else {
            element.height(element.find('.bmm-player-thumbnail').outerHeight());
          }

        };

        initialize();

      }
    };
  });
