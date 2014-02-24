'use strict';

angular.module('bmmLibApp')
  .directive('bmmVideoContainer', ['$timeout', 'bmmUser', function ($timeout, bmmUser) {
    return {
      template: '<div bmm-video-screen></div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS
            var videoscreen;

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

              videoscreen.css('top', 10);
              videoscreen.height(element.height()-10);
              videoscreen.width(element.height()/(9/16));

            };
            
            var setResizable = function() {

              element.resizable({
                handles: 'n',
                resize: function(e, ui) {
                  element.css('top', '');
                  element.attr('active', 'true');
                  bmmUser.setScreenHeight(ui.size.height);
                  videoscreen.show();
                }
              });

            };

          }
        };
      }
    };
  }]);