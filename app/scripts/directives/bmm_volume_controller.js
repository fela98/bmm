'use strict';

angular.module('bmmLibApp')
  .directive('bmmVolumeController', function ($timeout) {
    return {
      template: '<div bmm-volume-mute></div>'+
                '<div bmm-volume-slider></div>'+
                '<div bmm-volume-max></div>',
      compile : function() {
        return {
          pre : function(scope, element) {
            
            //DEFINITIONS
            var slider, width = 0;

            //PRESET
            element.addClass('bmm-volume-controller');

            //INITIALIZE
            $timeout(function() {
              slider = element.find('.bmm-volume-slider');
              element.children().css('float', 'left');
              organize();

              $(window).resize(function() {
                organize();
              });
            });

            //ORGANIZE STYLING BASED ON ATTRIBUTES
            var organize = function() {

              if (width === 0) {
                slider.find('.bmm-player-mediaslider').css('width','5em');
                element.children().each(function() { width+=$(this).width(); });
              }

              var orientation='horizontal';
              if (typeof element.attr('orientation')!=='undefined') {
                orientation = element.attr('orientation');
              } else if (element.parent().width()<=width) {
                orientation='vertical';
              }

              if (orientation==='vertical') {
                slider.attr('orientation', 'vertical').css({
                  marginTop: '',
                  marginLeft: '.65em'
                });
                element.children().css('float', 'none');
              } else {
                slider.attr('orientation', 'horizontal').css({
                  marginTop: '.65em',
                  marginLeft: ''
                });
                element.children().css('float', 'left');
              }

              if (typeof element.attr('length')!=='undefined') {
                slider.attr('length', element.attr('length'));
              }

            };
            
          }
        };
      }
    };
  });