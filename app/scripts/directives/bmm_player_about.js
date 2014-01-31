'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerAbout', [function () {
    return {
      template: '<div class="bmm-player-thumbnail"></div>'+
				'<div class="bmm-player-title"></div>'+
        '<div class="bmm-player-subtitle"></div>'+
        '<div class="bmm-player-extra"></div>',
      link: function postLink(scope, element, attrs) {
        element.addClass('bmm-player-about');

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

          scope.$watch('bmmPlayer.getTitle', function(title) {
            element.find('.bmm-player-title').html(title);
          });

          scope.$watch('bmmPlayer.getSubtitle', function(subtitle) {
            element.find('.bmm-player-subtitle').html(subtitle);
          });

          scope.$watch('bmmPlayer.getExtra', function(extra) {
            element.find('.bmm-player-extra').html(extra);
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
  }]);
