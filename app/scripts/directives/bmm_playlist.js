'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlaylist', [function () {
    return {
      template: '<table>'+
                  '<thead><tr>'+
                    '<th></th>'+
                    '<th></th>'+
                    '<th>Nr.</th>'+
                    '<th>Navn</th>'+
                    '<th>Varighet</th>'+
                    '<th>Innhold</th>'+
                    '<th>Språk</th>'+
                    '<th></th>'+
                  '</tr></thead><tbody ui-sortable="sortableOptions" ng-model="playlist">'+
                  '<tr ng-repeat="track in playlist"'+
                  '    ng-class="{even: $even, odd: $odd}">'+
                    '<td class="drag">=</td>'+
                    '<td class="sort">^ᵥ</td>'+
                    '<td>{{track.nr}}</td>'+
                    '<td>{{track.name}}</td>'+
                    '<td>{{track.duration}}</td>'+
                    '<td>{{track.content}}</td>'+
                    '<td>{{track.language}}</td>'+
                    '<td><div bmm-track-tools></div></td>'+
                  '</tr>'+
                '</table></tbody>',
      link: function postLink(scope, element) {
        
        scope.playlist = [
          {nr: 1, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 2, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 3, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 4, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 5, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 6, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'},
          {nr: 7, name: 'Navn Navnesen', duration: '00:00', content: 'Lorem ipsum dolor sit amet'}
        ];

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