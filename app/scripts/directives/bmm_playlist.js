'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlaylist', [function () {
    return {
      link: function postLink(scope, element) {

        scope.sortableOptions = {
          update: function() {
            scope.$apply('playlist');
          },
          handle: '.sort',
          axis: 'y'
        };

        scope.$watch('playlist', function() {

          element.find('tbody').find('tr').each(function() {
            $(this).draggable({
              handle: '.drag',
              helper: 'clone',
              appendTo: 'body',
              revert: 'invalid',
              scope: 'move'
            });
          });

          $('body').find('.bmm-playlist-private').droppable({
            scope: 'move',
            activeClass: 'active',
            hoverClass: 'hover',
            tolerance: 'pointer'
          });

        });

        element.addClass('bmm-playlist');

        element.click(function() {
          element.toggleClass('active');
        });

      }
    };
  }]);