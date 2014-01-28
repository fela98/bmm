'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoContainer', ['$timeout', 'bmmUser', function ($timeout, bmmUser) {
    return {
      template: '<div bmm-video-screen></div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS
            var videoscreen, direction;

            //PRESET
            element.addClass('bmm-video-container');

            //INITIALIZE
            $timeout(function() {

              videoscreen = element.find('.bmm-video-screen');
              setResizable();

              $(window).resize(function() {
                setResizable();
                setVideoDimensions();
              });

            });

            var setVideoDimensions = function() {

              if (typeof element.attr('direction')!=='undefined'&&
                  element.attr('direction')==='w') {
              
                videoscreen.width(element.width());
                videoscreen.height(element.width()/(16/9));

                videoscreen.css({
                  top: (element.height()/2)-(videoscreen.height()/2)
                });

              } else {

                videoscreen.css('top', 10);
                videoscreen.height(element.height()-10);
                videoscreen.width(element.height()/(9/16));

              }

            };
            
            var setResizable = function() {

              if (typeof element.attr('direction')!=='undefined') {
                
                if (direction!==element.attr('direction')) {

                  direction = element.attr('direction');

                  element.resizable('destroy');

                  switch (direction) {

                    case 'n':
                      element.resizable({
                        handles: direction,
                        resize: function(e, ui) {
                          element.css('top', '');
                          element.attr('active', 'true');
                          bmmUser.setScreenHeight(ui.size.height);
                          videoscreen.show();
                        }
                      });
                      break;
                    case 'w':
                      element.resizable({
                        handles: direction,
                        resize: function(e, ui) {
                          element.css('left', '');
                          element.attr('active', 'true');
                          bmmUser.setScreenWidth(ui.size.width);
                          videoscreen.show();
                        }
                      });
                      break;
                    default:
                      element.resizable({
                        handles: direction
                      });
                      break;

                  }

                }

              } else if (typeof direction==='undefined') {

                direction = 'n';
                element.resizable({
                  handles: direction,
                  resize: function(e, ui) {
                    element.css('top', '');
                    element.attr('active', 'true');
                    bmmUser.setScreenHeight(ui.size.height);
                    videoscreen.show();
                  }
                });

              }

            };

          }
        };
      }
    };
  }]);