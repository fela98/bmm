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
              
              bmmApi.userTrackCollectionLink($(this).attr('id'), [
                ui.draggable.attr('id') //@todo - make possible for multiple ids
              ], ui.draggable.attr('language')).fail(function() {

                $rootScope.$apply();

              });

            }
          });
        };

        //Scroll while dragging
        var clicked = false, clickY;
        $('.bmm-view').on({
            'mousemove': function(e) {
                clicked && updateScrollPos(e);
            },
            'mousedown': function(e) {
                clicked = true;
                clickY = e.pageY;
            },
            'mouseup': function() {
                clicked = false;
            }
        });

        var updateScrollPos = function(e) {
            $('.bmm-view').scrollTop($('.bmm-view').scrollTop() + (clickY - e.pageY));
        }

      }
    };
  }]);