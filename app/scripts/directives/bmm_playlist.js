'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlaylist', ['$rootScope', 'bmmApi', function ($rootScope, bmmApi) {
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
              appendTo: '.bmm-main-container',
              revert: 'invalid',
              scope: 'move',
              containment: '.bmm-main-container',
              scroll: true
            });
          });

          $('body').find('.bmm-playlist-private').droppable({
            scope: 'move',
            activeClass: 'active',
            hoverClass: 'hover',
            tolerance: 'pointer',
            drop: function(ev, ui) {
              
              bmmApi.userTrackCollectionLink($(this).attr('id'), [
                ui.draggable.attr('id') //@todo - make possible for multiple ids
              ], ui.draggable.attr('language')).fail(function() {

                $rootScope.$apply();

              });

            }
          });
        };

      }
    };
  }]);