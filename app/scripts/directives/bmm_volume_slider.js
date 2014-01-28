'use strict';

angular.module('bmmLibApp')
  .directive('bmmVolumeSlider', function ($timeout) {
    return {
      template: '<div bmm-player-mediaslider class="bmm-minified"></div>',
      compile : function() {
        return {
          pre : function(scope, element) {

            //DEFINITIONS
            var slider, orientation = 'horizontal', length = '5em';

            //PRESET
            element.addClass('bmm-volume-slider');

            //INITIALIZE
            $timeout(function() {

              slider = element.find('.bmm-player-mediaslider');
              slider.attr('length', length);
              
              scope.$watch(function() {
                return element.attr('');
              }, function() {
                
                if (typeof element.attr('orientation')!=='undefined') {
                  orientation = element.attr('orientation');
                }

                if (typeof element.attr('length')!=='undefined') {
                  length = element.attr('length');
                }

                slider.attr('orientation', orientation);
                slider.attr('length', length);

              });

              $(window).resize(function() {
                
                if (typeof element.attr('orientation')!=='undefined'&&
                    element.attr('orientation')!==orientation) {

                  orientation = element.attr('orientation');
                  scope.$apply(function() { slider.attr('orientation', orientation); });

                }

                if (typeof element.attr('length')!=='undefined'&&
                    element.attr('length')!==length) {

                  length = element.attr('length');
                  scope.$apply(function() { slider.attr('length', length); });

                }

              });
            });
            
          }
        };
      }
    };
  });