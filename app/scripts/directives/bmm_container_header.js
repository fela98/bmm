'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerHeader', ['$timeout', function ($timeout) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS
            var display, minHeight, parentHeight, elHeight, animate=false;

            //PRESET
            element.addClass('bmm-container-header');

            //INITIALIZE

            /**
             * Require 3 timeouts to ensure bmm_container_main
             * has set element.parent.height() correctly
             */

            $timeout(function() {
              $timeout(function() {
                $timeout(function() {
                  checkAppearance();
                });
              });
            });

            $(window).resize(function() {

              checkAppearance();

            });

            var checkAppearance = function() {

              parentHeight = element.parent().height();
              elHeight = element.height();
              minHeight = elHeight*4;

              if (!animate) {

                if (typeof display==='undefined'&&
                    (parentHeight<minHeight||
                     element.width()<800)) {

                  element.parent().find('.bmm-navigator-playlist')
                  .addClass('minified');

                  element.css('display', 'none');
                  display = false;

                } else if (typeof display==='undefined') {

                  display = true;

                } else if (display&&(parentHeight<minHeight||element.parent().width()<800)) {

                  element.parent().find('.bmm-navigator-playlist')
                  .addClass('minified');

                  animate = true;
                  element.animate({
                    height: 0
                  }, 'fast', function() {
                    element.css({
                      height: '',
                      display: 'none'
                    });
                    animate = false;
                    checkAppearance();
                  });

                  display = false;

                } else if (!display&&parentHeight>=minHeight&&element.parent().width()>=800) {

                  element.parent().find('.bmm-navigator-playlist')
                  .removeClass('minified');

                  animate = true;
                  element.css({
                    height: 0,
                    display: ''
                  }).animate({
                    height: elHeight
                  }, 'fast', function() {
                    animate = false;
                    checkAppearance();
                  });

                  display = true;

                }

              }

            };
            
          }
        };
      }
    };
  }]);
