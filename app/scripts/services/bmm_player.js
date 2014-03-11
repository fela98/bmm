'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlayer', ['bmmPlaylist', '$timeout', '$rootScope', function (bmmPlaylist, $timeout, $rootScope) {
  
  var factory = {},
      videoTarget,
      source;

  factory.initialize = function(target) {

    if (typeof target!=='undefined') {
      videoTarget = target;
    }

    if (typeof videoTarget!=='undefined') {

      $(videoTarget).jPlayer({
        ready: function(e) {
          //Initialization complete
          factory.setSource(bmmPlaylist.getCurrent());
          factory.getVolume = e.jPlayer.options.volume;
        },
        swfPath: 'bower_components/jplayer/jquery.jplayer/Jplayer.swf',
        supplied: 'm4v, mp3',
        seeking: function() {
          //Seeking
        },
        seeked: function() {
          //Finished seeking
        },
        canplay: function() {
          //Buffer 'complete'
        },
        timeupdate: function() {
          //Track step
          $rootScope.safeApply(function() {
            factory.getCurrentTime = $(videoTarget).data('jPlayer').
                                     status.currentTime;
            factory.getCurrentTimePercent = $(videoTarget).data('jPlayer').
                                            status.currentPercentAbsolute;
          });
        },
        ended: function() {
          //End of track
          factory.setNext(true);
        },
        resize: function() {
          //Fullscreen was toggled
          $rootScope.$apply(function() {
            if (factory.getFullscreen==='off') {
              factory.getFullscreen='on';
            } else {
              factory.getFullscreen='off';
            }
          });
        },
        size: {
          width: '100%',
          height: '100%'
        }
      });

    }

  };

  factory.setPlay = function() {
    $(videoTarget).jPlayer('play');
    //$rootScope.$apply(function() {
    factory.getPlaying = true;
    //});
  };

  factory.setPause = function() {
    $(videoTarget).jPlayer('pause');
    //$rootScope.$apply(function() {
    factory.getPlaying = false;
    //});
  };

  factory.setStop = function() {
    $(videoTarget).jPlayer('stop');
    //$rootScope.$apply(function() {
    factory.getPlaying = false;
    //});
  };

  factory.setNext = function(play) {
    var src = bmmPlaylist.getNext();
    if (src!==false) {
      factory.setSource(src);
      if (typeof play!=='undefined'&&play) {
        factory.setPlay();
      }
    }
  };

  factory.setPrevious = function() {
    var src = bmmPlaylist.getPrevious();
    if (src!==false) {
      factory.setSource(src);
    }
  };

  factory.setMute = function(bool) {
    if (typeof bool!=='undefined') {
      if (bool) {
        $(videoTarget).jPlayer('mute');
      } else {
        $(videoTarget).jPlayer('unmute');
      }
      
    } else {
      if ($(videoTarget).data('jPlayer').options.muted) {
        $(videoTarget).jPlayer('unmute');
      } else {
        $(videoTarget).jPlayer('mute');
      }
    }
  };

  factory.setFullscreen = function(bool) {
    if (typeof bool!=='undefined') {
      $(videoTarget).jPlayer({ fullScreen: bool });
    } else {

      if (factory.getFullscreen==='off') {
        bool = true;
      } else {
        bool = false;
      }
      
    }
    $(videoTarget).jPlayer({ fullScreen: bool });
    return bool;
  };

  factory.setVolume = function(volume) {
    //$rootScope.$apply(function() {
    $(videoTarget).jPlayer('volume', volume);
    factory.getVolume = volume;
    //});
  };

  factory.setSource = function(track) {

    var paused = $(videoTarget).data('jPlayer').status.paused;
    source = track;

    factory.getTitle = track.title;
    factory.getSubtitle = track.subtitle;
    factory.getExtra = track.extra;

    if (source.video) {
      $(videoTarget).jPlayer('setMedia', {
        m4v: source.url,
        poster: 'http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png'
      });
    } else {
      $(videoTarget).jPlayer('setMedia', {
        mp3: source.url,
        poster: 'http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png'
      });
    }

    if (!paused) {
      factory.setPlay();
    }

  };

  factory.setCurrentTime = function(value) {
    $(videoTarget).jPlayer('playHead', value);
  };

  factory.getDuration = function() {
    return $(videoTarget).data('jPlayer').status.duration;
  };

  factory.getCurrentTime = 0;
  factory.getCurrentTimePercent = 0;
  factory.getVolume = 0;
  factory.getTitle = '';
  factory.getSubtitle = '';
  factory.getExtra = '';
  factory.getFullscreen = 'off';
  factory.getPlaying = false;

  $rootScope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase === '$apply' || phase === '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  return factory;

}]);