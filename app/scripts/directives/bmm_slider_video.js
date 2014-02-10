'use strict';

angular.module('bmmLibApp')
  .directive('bmmSliderVideo', ['$timeout', 'bmmIndex', function ($timeout, bmmIndex) {
    return {
      template: '<div class="video-left"></div>'+
            '<ul class="video-content">'+
              '<li ng-repeat="video in latestVideos">'+
                '<div class="title"></div>'+
              '</li>'+
            '</ul>'+
            '<div class="video-right"></div>'+
            '<div class="videoshadow"></div>',
      link: function postLink(scope, element, attrs) {

        var videos = [], video;
        
        scope.$watch(function() {

          if (attrs.bmmVideos!==videos) {

            videos = attrs.bmmVideos;
            element.find('ul').empty();

            $.each($.parseJSON(videos), function() {

              video = '<li><div class="video-title">'+this.interprets+'</div></li>';
              element.find('ul').append(video);

            });

            element.find('.video-title').css({
              opacity: 0
            });

            initialize();

          }

        });

        var initialize = function() {

          var vleft = element.find('.video-left'),
            vright = element.find('.video-right'),
            shadow = element.find('.videoshadow'),
            left, height,
            vidIndex = 1,
            vidIndexMax = element.find('li').length;

          //START CSS
          element.css('position', 'relative');

          left = (element.width()/2)-(element.find('li').width()/2);
          height = element.find('li').width()/(16/9);

          shadow.css('top', height+(height/10) );
          vleft.css('top', height/2-(vleft.height()/2) );
          vright.css('top', height/2-(vright.height()/2) );

          element.find('li').css({
            left: left,
            height: height
          }).hide();

          //VIDEO LEFT
          if (vidIndexMax>1) {
            element.find('li:nth-child('+bmmIndex.prev(vidIndex, vidIndexMax, 1, 1)+')').css({
              zIndex: 1,
              transform: 'perspective(600px) scale(0.7,0.7) rotateY(30deg) translate3d(-190px,0,-50px)'
            }).show();
          }

          //VIDEO MIDDLE
          if (vidIndexMax!==-1) {
            element.find('li:nth-child('+vidIndex+')').css({
              zIndex: 2,
              transform: 'perspective(600px) scale(1,1) rotateY(0deg) translate3d(0,0,0)'
            }).show().find('.video-title').css({
              opacity: 1
            });
          }

          //VIDEO RIGHT
          if (vidIndexMax>0) {
            element.find('li:nth-child('+(vidIndex+1)+')').css({
              zIndex: 1,
              transform: 'perspective(600px) scale(0.7,0.7) rotateY(-30deg) translate3d(190px,0,-50px)'
            }).show();
          }

          element.css({
            height: element.find('li').height()
          });
          //END CSS

          var speed = 5,
              steps = 5;

          //SLIDE LEFT
          vleft.click(function() {

            var v0 = element.find('li:nth-child('+bmmIndex.prev(vidIndex,vidIndexMax,2,1)+')'),
                v1 = element.find('li:nth-child('+bmmIndex.prev(vidIndex,vidIndexMax,1,1)+')'),
                v2 = element.find('li:nth-child('+vidIndex+')'),
                v3 = element.find('li:nth-child('+bmmIndex.next(vidIndex,vidIndexMax,1)+')');

            vidIndex = bmmIndex.prev(vidIndex,vidIndexMax,1,1);

            //Hack because transform animation is not suported
            v2.css('textIndent', 0);
            v2.animate({textIndent: steps}, {
              step: function(now) {

                var scale = 1-now*(0.3/steps),
                    deg = -now*(30/steps),
                    x = now*(190/steps),
                    z = -now*(50/steps),
                    alpha = 1-now*(1/steps);

                $(this).css('transform', 'perspective(600px) scale('+scale+','+scale+') rotateY('+deg+'deg) translate3d('+x+'px,0,'+z+'px)');
                $(this).find('.video-title').css({
                  opacity: alpha
                });

              },
              complete: function() {
                v3.fadeOut();
                $(this).css('zIndex', '1');
              }
            }, speed);

            v1.css('textIndent', 0);
            v1.animate({textIndent: steps}, {
              start: function() {
                v0.css({
                  transform: 'perspective(600px) scale(0.7,0.7) rotateY(30deg) translate3d(-190px,0,-50px)'
                }).show();
                $(this).css('zIndex', '3');
              },
              step: function(now) {

                var scale = 0.7+now*(0.3/steps),
                    deg = 30-now*(30/steps),
                    x = -190+now*(190/steps),
                    z = -50+now*(50/steps),
                    alpha = now*(1/steps);

                $(this).css('transform', 'perspective(600px) scale('+scale+','+scale+') rotateY('+deg+'deg) translate3d('+x+'px,0,'+z+'px)');
                $(this).find('.video-title').css({
                  opacity: alpha
                });

              },
              complete: function() {
                v0.css('zIndex', '1');
                $(this).css('zIndex', '2');
              }
            }, speed);

          });

          //SLIDE RIGHT
          vright.click(function() {

            var v1 = element.find('li:nth-child('+bmmIndex.prev(vidIndex,vidIndexMax,1,1)+')'),
                v2 = element.find('li:nth-child('+vidIndex+')'),
                v3 = element.find('li:nth-child('+bmmIndex.next(vidIndex,vidIndexMax,1)+')'),
                v4 = element.find('li:nth-child('+bmmIndex.next(vidIndex,vidIndexMax,2)+')');

            vidIndex = bmmIndex.next(vidIndex,vidIndexMax,1,1);

            //Hack because transform animation is not suported
            v2.css('textIndent', 0);
            v2.animate({textIndent: steps}, {
              step: function(now) {

                var scale = 1-now*(0.3/steps),
                    deg = now*(30/steps),
                    x = -now*(190/steps),
                    z = -now*(50/steps),
                    alpha = 1-now*(1/steps);

                $(this).css('transform', 'perspective(600px) scale('+scale+','+scale+') rotateY('+deg+'deg) translate3d('+x+'px,0,'+z+'px)');
                $(this).find('.video-title').css({
                  opacity: alpha
                });

              },
              complete: function() {
                v1.fadeOut();
                $(this).css('zIndex', '1');
              }
            }, speed);

            v3.css('textIndent', 0);
            v3.animate({textIndent: steps}, {
              start: function() {
                v4.css({
                  transform: 'perspective(600px) scale(0.7,0.7) rotateY(-30deg) translate3d(190px,0,-50px)'
                }).show();
                $(this).css('zIndex', '3');
              },
              step: function(now) {

                var scale = 0.7+now*(0.3/steps),
                    deg = -30+now*(30/steps),
                    x = 190-now*(190/steps),
                    z = -50+now*(50/steps),
                    alpha = now*(1/steps);

                $(this).css('transform', 'perspective(600px) scale('+scale+','+scale+') rotateY('+deg+'deg) translate3d('+x+'px,0,'+z+'px)');
                $(this).find('.video-title').css({
                  opacity: alpha
                });

              },
              complete: function() {
                v4.css('zIndex', '1');
                $(this).css('zIndex', '2');
              }
            }, speed);

          });

        };

      }
    };
  }]);