'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderMusic', [function () {
    return {
      template: '<div class="music-left"></div>'+
                '<ul class="music-content"></ul>'+
                '<div class="music-right"></div>',
      link: function postLink(scope, element, attrs) {

        var albums = [], album;

        scope.$watch(function() {

          if (attrs.bmmAlbums!==albums) {

            albums = attrs.bmmAlbums;
            element.find('ul').empty();

            $.each($.parseJSON(albums), function() {

              album = '<li></li>';
              element.find('ul').append(album);

            });

            initialize();

          }

        });

        var initialize = function() {

          var mleft = element.find('.music-left'),
            mright = element.find('.music-right'),
            height = element.find('li').width(),
            musIndex = 1,
            musIndexMax = element.find('li').length;

          //START CSS
          element.css('position', 'relative');

          mleft.css('top', height/2-(mleft.height()/2) );
          mright.css('top', height/2-(mright.height()/2) );

          element.find('li').height(height).hide();
          element.height(height);
          element.find('ul').height(element.height());
          //END CSS

          var li, i;

          for(i=0; i<4; i++) {

            if (musIndexMax>=(i+musIndex)) {

              li = element.find('li:nth-child('+(i+musIndex)+')');
              li.show();

              if ((i+musIndex)!==musIndex) {

                li.css({
                  left: (li.width()+((element.width()-(li.width()*4))/3))*i
                });

              }

            } else {
              break;
            }

          }
          
          var speed = 200;

          //SLIDE LEFT
          mleft.click(function() {

            if (musIndex>4) {

              var li, i;

              for(i=0; i<4; i++) {

                li = element.find('li:nth-child('+(i+musIndex-4)+')');

                li.css({
                  left: ((li.width()+((element.width()-(li.width()*4))/3))*i)-((element.width()-(li.width()*4))/3)-element.width()
                }).show();

                li.animate({
                  left: ((li.width()+((element.width()-(li.width()*4))/3))*i)
                }, speed);

                if (musIndexMax>=(i+musIndex)) {

                  li = element.find('li:nth-child('+(i+musIndex)+')');

                  li.animate({
                    left: ((li.width()+((element.width()-(li.width()*4))/3))*i)+element.width()
                  }, speed, $(this).hide());

                }

              }

              musIndex-=4;

            }

          });

          //SLIDE RIGHT
          mright.click(function() {

            var li, i;

            if (musIndexMax>(musIndex+3)) {

              for(i=0; i<4; i++) {

                if (musIndexMax>=(i+musIndex+4)) {

                  li = element.find('li:nth-child('+(i+musIndex+4)+')');

                  li.css({
                    left: ((li.width()+((element.width()-(li.width()*4))/3))*i)+((element.width()-(li.width()*4))/3)+element.width()
                  }).show();

                  li.animate({
                    left: ((li.width()+((element.width()-(li.width()*4))/3))*i)
                  }, speed);

                }

                li = element.find('li:nth-child('+(i+musIndex)+')');

                li.animate({
                  left: ((li.width()+((element.width()-(li.width()*4))/3))*i)-element.width()
                }, speed, $(this).hide() );

              }

              musIndex+=4;

            }

          });

        };

      }
    };
  }]);
