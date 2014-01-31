'use strict';

angular.module('bmmLibApp')
  .directive('bmmPlayerController', ['$timeout', 'bmmUser', 'bmmPlayer', function ($timeout, bmmUser, bmmPlayer) {
    return {
      template: '<div bmm-video-container></div>'+
                '<div class="bmm-max-width">'+
                  '<div bmm-player-about title=""></div>'+
                  '<div class="bmm-player-buttons">'+
                    '<div bmm-player-repeat></div>'+
                    '<div bmm-player-clock id="clock1">00:00</div>'+
                    '<div bmm-player-mediaslider></div>'+
                    '<div bmm-player-clock id="clock2">00:00</div>'+
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
                video, videoContainer, toolsPos='', defaultVideoPos = true,
                minified = false;

            //PRESET
            element.addClass('bmm-player-controller');

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
                resizeVideoScreen();
              });

              //UPDATE MEDIASLIDER WHILE PLAYING
              $timeout(function() {

                scope.bmmPlayer = bmmPlayer;
                scope.$watch('bmmPlayer.getCurrentTimePercent', function(time) {
                  if (!mediaslider.children('.ui-slider-handle').hasClass('ui-state-active')) {
                    mediaslider.slider('value', time);
                  }
                  element.find('#clock1').attr('time', bmmPlayer.getCurrentTime);
                  element.find('#clock2').attr('time', bmmPlayer.getDuration()-bmmPlayer.getCurrentTime);
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
              resizeVideoScreen();
              $timeout(function() {
                resizeTarget();
              });
            });

            //CHANGE VIDEOSCREEN POSITION AND DIMENSION
            var resizeVideoScreen = function() {

              if (toolsPos==='sideTools'&&defaultVideoPos) {

                defaultVideoPos = false;
                videoContainer.css({
                  position: 'absolute',
                  right: element.parent().find('.bmm-player-tools').width()-1,
                  height: target.height()+1,
                  top: -videoContainer.height(),
                  width: 0
                }).attr({
                  direction: 'w'
                });

                if (videoContainer.attr('active')==='true') {
                  videoContainer.css('width', bmmUser.getScreenWidth());
                }

              } else if (!defaultVideoPos&&(
                          toolsPos==='normalTools'||
                          toolsPos==='topTools'
                        )) {

                defaultVideoPos = true;
                videoContainer.css({
                  position: '',
                  right: '',
                  height: 0,
                  top: '',
                  width: ''
                }).attr({
                  direction: 'n'
                });

                if (videoContainer.attr('active')==='true') {
                  videoContainer.css('height', bmmUser.getScreenHeight());
                }

              } else if (toolsPos==='sideTools') {

                videoContainer.css({
                  top: -videoContainer.height()+2,
                  height: target.height()+4
                });

              }

            };

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

              } else if (toolsPos==='sideTools') {

                target.css({
                  position: 'absolute',
                  top: '0',
                  width: element.parent().outerWidth()-
                         tools.outerWidth(),
                  height: element.parent().outerHeight()-
                          element.outerHeight()+1
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
              } else if (element.parent().height()<350&&
                        toolsPos!=='sideTools'&&
                        element.width()>=450&&
                        minified===true) {
                reorganizePlayer('sideTools');
              } else if (toolsPos!=='normalTools'&&
                        element.width()>=450&&
                        element.parent().height()>=350||
                        (minified===false&&toolsPos==='sideTools')) {
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

                case 'sideTools':

                  element.css('paddingTop', '.3em');
    
                  volume.attr({
                    length: '2.5em',
                    orientation: 'vertical'
                  });
                  
                  tools.detach().prependTo(element.parent())
                  .css({
                    position: 'absolute',
                    top: '0',
                    left: '',
                    right: '0',
                    width: '2em',
                    background: '#1c1c1c',
                    height: '100%',
                  }).children().css('float', 'left');

                  mainControllers.insertAfter(videoContainer);

                  video.detach().insertBefore(mainControllers)
                  .css({
                    height: '1.8em',
                    float: 'left'
                  });

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