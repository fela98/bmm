'use strict';

angular.module('bmmLibApp')
  .directive('bmmVolumeSlider', ['$timeout', 'bmmPlayer', function ($timeout, bmmPlayer) {
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
                playerListener();

              });

              $(window).resize(function() {
                
                if (typeof element.attr('orientation')!=='undefined'&&
                    element.attr('orientation')!==orientation) {

                  orientation = element.attr('orientation');
                  scope.$apply(function() { slider.attr('orientation', orientation); });
                  playerListener();

                }

                if (typeof element.attr('length')!=='undefined'&&
                    element.attr('length')!==length) {

                  length = element.attr('length');
                  scope.$apply(function() { slider.attr('length', length); });
                  playerListener();

                }

              });

            });

            var playerListener = function() {
              $timeout(function() {
                $timeout(function() {

                  var slider = element.find('.bmm-player-mediaslider');

                  scope.bmmPlayer = bmmPlayer;
                  scope.$watch('bmmPlayer.getVolume', function(volume) {
                    if (!slider.children('.ui-slider-handle').hasClass('ui-state-active')) {
                      slider.slider('value', (volume*100));
                    }
                  });

                  slider.slider({
                    slide: function(e, ui) {
                      bmmPlayer.setVolume((ui.value/100));
                    }
                  });

                });
              });
            };
            
          }
        };
      }
    };
  }]);