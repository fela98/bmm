'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerController', ['$timeout', 'bmmUser', 'bmmPlayer', function ($timeout, bmmUser, bmmPlayer) {
    return {
      template: '<div bmm-video-container></div>'+
                '<div class="bmm-max-width">'+
                  '<div bmm-player-about title=""></div>'+
                  '<div class="bmm-player-buttons">'+
                    '<div bmm-player-repeat></div>'+
                    '<div class="bmm-player-clock" id="clock1">{{clock1 | bmmTime}}</div>'+
                    '<div bmm-player-mediaslider></div>'+
                    '<div class="bmm-player-clock" id="clock2">{{clock2 | bmmTime}}</div>'+
                    '<div bmm-player-shuffle></div>'+
                    '<div bmm-player-maincontrollers></div>'+
                    '<div class="bmm-player-tools">'+
                      '<div bmm-track-tools></div>'+
                      '<div bmm-volume-controller></div>'+
                      '<div bmm-player-video></div>'+
                    '</div>'+
                  '</div>'+
                '</div>',
      compile : function() {
        return {
          pre : function(scope, element) {

            //DEFINITIONS
            var width, aboutWidth, clock1, clock2, target, buttons, repeat,
                mediaslider, shuffle, mainControllers, tools, about, volume,
                video, videoContainer, toolsPos='',
                minified = false;

            //PRESET
            element.addClass('bmm-player-controller');
            scope.clock1 = '00:00';
            scope.clock2 = '00:00';

            //INITIALIZE
            $timeout(function() {

              buttons = element.find('.bmm-player-buttons');
              repeat = element.find('.bmm-player-repeat');
              mediaslider = buttons.children('.bmm-player-mediaslider');
              shuffle = element.find('.bmm-player-shuffle');
              mainControllers = element.find('.bmm-player-maincontrollers');
              tools = element.find('.bmm-player-tools');
              about = element.find('.bmm-player-about');
              volume = element.find('.bmm-volume-controller');
              video = element.find('.bmm-player-video');
              videoContainer = element.find('.bmm-video-container');
              target = element.parent().find('.bmm-player-target');

              element.find('.bmm-player-clock').each(function(i) {
                if (i===0) { clock1 = $(this); } else { clock2 = $(this); }
              });

              aboutWidth = about.outerWidth();

              checkForChanges();
              $timeout(function() {
                resizeTarget();
              });

              //UPDATE MEDIASLIDER WHILE PLAYING
              $timeout(function() {

                scope.bmmPlayer = bmmPlayer;
                scope.$watch('bmmPlayer.getCurrentTimePercent', function(time) {
                  if (!mediaslider.children('.ui-slider-handle').hasClass('ui-state-active')) {
                    mediaslider.slider('value', time);
                  }
                  scope.clock1 = bmmPlayer.getCurrentTime;
                  scope.clock2 = (bmmPlayer.getDuration()-bmmPlayer.getCurrentTime);
                  checkForChanges();
                });

                mediaslider.slider({
                  slide: function(e, ui) {
                    bmmPlayer.setCurrentTime(ui.value);
                  }
                });

              });

              video.click(function() {

                var extraHeight = 0;
                if (toolsPos==='topTools') {
                  extraHeight = element.parent().find('.bmm-player-tools').height();
                }

                if (videoContainer.attr('active')==='true') {
                  videoContainer.attr('active', 'false');

                  if (videoContainer.attr('direction')!=='w') {

                    target.animate({
                      height: element.parent().height()-extraHeight-
                              (element.height()-bmmUser.getScreenHeight())
                    }, 'fast');

                    videoContainer.animate({
                      height: 0
                    }, 'fast', function() {
                      element.find('.bmm-video-screen').hide();
                      $(window).trigger('resize');
                    });

                  } else {

                    target.animate({
                      width: element.parent().width()-
                             element.parent().find('.bmm-player-tools').width()
                    }, 'fast');

                    videoContainer.animate({
                      width: 0
                    }, 'fast', function() {
                      element.parent().find('.bmm-video-screen').hide();
                      $(window).trigger('resize');
                    });

                  }

                } else {
                  videoContainer.attr('active', 'true');

                  element.parent().find('.bmm-video-screen').show();

                  if (videoContainer.attr('direction')!=='w') {

                    element.parent().find('.bmm-video-screen').css({
                      width: (bmmUser.getScreenHeight()-10)/(9/16),
                      height: bmmUser.getScreenHeight()-10,
                      top: 10
                    });

                    target.animate({
                      height: element.parent().height()-
                              element.height()-
                              bmmUser.getScreenHeight()-
                              extraHeight

                    }, 'fast');

                    videoContainer.animate({
                      height: bmmUser.getScreenHeight()
                    }, 'fast', function() {
                      $(window).trigger('resize');
                    });

                  } else {

                    element.parent().find('.bmm-video-screen').css({
                      width: bmmUser.getScreenWidth(),
                      height: bmmUser.getScreenWidth()/(16/9),
                      top: (videoContainer.height()/2)-
                           (bmmUser.getScreenWidth()/(16/9)/2)
                    });

                    target.animate({
                      width: element.parent().width()-
                             element.parent().find('.bmm-player-tools').width()-
                             bmmUser.getScreenWidth()+1
                    }, 'fast');

                    videoContainer.animate({
                      width: bmmUser.getScreenWidth()
                    }, 'fast', function() {
                      $(window).trigger('resize');
                    });

                  }

                }

              });

            });

            //IF DIV DIMENSIONS CHANGE
            $(window).resize(function() {
              checkForChanges();
              $timeout(function() {
                resizeTarget();
              });
            });

            //CHANGE TARGET DIMENSIONS
            var resizeTarget = function() {

              if (toolsPos===''||toolsPos==='normalTools') {

                target.css({
                  position: 'absolute',
                  top: '0',
                  width: '100%',
                  height: element.parent().outerHeight()-
                          element.outerHeight()+1
                });

              } else if (toolsPos==='topTools') {

                target.css({
                  position: 'absolute',
                  top: tools.outerHeight(),
                  width: '100%',
                  height: element.parent().outerHeight()-
                          element.outerHeight()-
                          tools.outerHeight()+1
                });

              }

            };

            //CHANGE MEDIASLIDER WIDTH
            var setSliderWidth = function() {
              width=repeat.width()+clock1.width()+clock2.width()+shuffle.width();
              width=buttons.width()-(width+(width/1.8));
              mediaslider.width(width).attr('length',width);
            };

            //CHECK FOR CHANGES TO PLAYER DIMENSIONS
            var checkForChanges = function() {

              //Check if 'player-about' should be minified and find size of slider
              if (buttons.width()<(aboutWidth*1.8)&&!minified) {
                minified=true;
                reorganizePlayer('minified');
              } else if (buttons.width()>=(aboutWidth*2.8)&&minified) {
                minified=false;
                reorganizePlayer();
                setSliderWidth();
              } else if (buttons.width()>=(aboutWidth*1.8)&&!minified) {
                setSliderWidth();
              }

              //Find a position for the toolset
              if (element.width()<450&&toolsPos!=='topTools') {
                reorganizePlayer('topTools');
              } else if (toolsPos!=='normalTools'&&
                        element.width()>=450) {
                reorganizePlayer('normalTools');
              }

            };

            //REORGANIZE PLAYER DIRECTIVES
            var reorganizePlayer = function(position) {

              if (typeof position!== 'undefined'&&position!=='minified') {
                toolsPos = position;
              }

              switch (position) {
                case 'minified':

                  var minitimer;
                  
                  about.addClass('bmm-minified');
                  about.css({
                    padding: '.5em 0 0 .8em',
                    height: '',
                    float: 'none'
                  });

                  about.after('<div class="bmm-player-minitimer"></div>');
                  minitimer = element.find('.bmm-player-minitimer');

                  repeat.detach().appendTo(minitimer);
                  clock1.remove().appendTo(minitimer);
                  minitimer.append('<div>&nbsp/&nbsp</div>');
                  clock2.remove().appendTo(minitimer);
                  shuffle.detach().appendTo(minitimer);

                  minitimer.children().css('float', 'left');
                  minitimer.css({
                    position: 'absolute',
                    top: '.5em',
                    right: '.8em'
                  });

                  buttons.css('padding', '.5em');

                  mediaslider.css({
                    width: '',
                    float: 'none'
                  });

                  break;

                case 'topTools':
    
                  volume.attr({
                    length: '4em',
                    orientation: 'horizontal'
                  });

                  element.css('paddingTop', '');
                  mainControllers.insertAfter(mediaslider);
                  video.detach().insertAfter(mainControllers).css('float', 'right');

                  tools.detach().prependTo(element.parent())
                  .css({
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '',
                    width: '100%',
                    height: '',
                    background: '#1c1c1c'
                  });

                  break;

                case 'normalTools':

                  element.css('paddingTop', '');
    
                  volume.attr({
                    length: '5em',
                    orientation: 'horizontal'
                  });

                  if (element.find('.bmm-player-minitimer').length>0) {
                    mainControllers.insertAfter(mediaslider);
                  } else {
                    mainControllers.insertAfter(shuffle);
                  }

                  element.parent().find('.bmm-player-tools')
                  .detach().insertAfter(mainControllers)
                  .css({
                    position: '',
                    top: '',
                    left: '',
                    right: '',
                    width: '',
                    height: '',
                    background: ''
                  }).children().css('float', '');

                  video.detach().appendTo(tools).css('float', '');

                  break;

                default:

                  repeat.detach().insertBefore(mediaslider).css('float', '');
                  clock1.detach().insertBefore(mediaslider).css('float', '');
                  shuffle.detach().insertAfter(mediaslider).css('float', '');
                  clock2.detach().insertAfter(mediaslider).css('float', '');

                  element.find('.bmm-player-minitimer').remove();
                  buttons.css('padding', '');
                  mediaslider.css('float', '');

                  about.removeClass('bmm-minified');
                  about.css({
                    padding: '',
                    float: ''
                  });

                  mainControllers.detach().insertAfter(shuffle);

                  break;
              }

            };

          }
        };
      }
    };
  }]);