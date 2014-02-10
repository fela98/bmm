'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderList', [function () {
    return {
      template: '<div class="list">'+
                  '<div class="list-header">'+
                    '<div class="list-title">Tittel</div>'+
                    '<div class="list-btns"></div>'+
                  '</div>'+
                '</div>',
      link: function postLink(scope, element, attrs) {

        var lists, html;

        scope.$watch(function() {

          if (attrs.bmmLists!==lists) {

            lists = attrs.bmmLists;
            element.find('ul').remove();

            $.each($.parseJSON(lists), function() {

              html = '<ul>';

              $.each(this, function() {

                html+='<li>'+this.title+'</li>';

              });

              html+='</ul>';

              element.find('.list').append(html);

            });

            initialize();

          }

        });

        var initialize = function() {

          element.css({
            position: 'relative',
            width: '24%',
            float: 'left',
            marginTop: '2.5em'
          });

          element.find('ul').each(function(index) {

            element.find('.list-btns').append('<div idx="'+index+'" class="list-btn"></div>');
            $(this).css('display','none');

          });

          element.find('ul:first').css('display','inline-block');
          element.find('.list-btn:first').css('background','white');

          element.find('.list-btn').click(function() {

            element.find('.list-btn').css('background', 'none');
            $(this).css('background','white');

            element.find('ul').css('display','none');
            element.find('ul:nth-child('+(Number($(this).attr('idx'))+2)+')').css('display','inline-block');

          });

        };

      }
    };
  }]);
