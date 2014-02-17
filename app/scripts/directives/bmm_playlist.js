'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlaylist', ['bmmApi', function (bmmApi) {
    return {
      link: function postLink(scope, element) {

        scope.sortableOptions = {
          update: function() {
            scope.$apply('playlist');
          },
          handle: '.sort',
          axis: 'y'
        };

        element.addClass('bmm-playlist');

        $('.bmm-playlist').on('dragdrop', function() {

          appendDragDrop();

        });

        scope.$watch('playlist', function() {

          appendDragDrop();

        });

        element.click(function() {
          element.toggleClass('active');
        });

        var appendDragDrop = function() {
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
            tolerance: 'pointer',
            drop: function(ev, ui) {

              bmmApi.userTrackCollectionLink($(this).attr('id'), {
                'Link': ui.draggable.attr('id')
              });
              
            }
          });
        };

      }
    };
  }]);