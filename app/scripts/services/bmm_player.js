'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlayer', ['bmmPlaylistDemo', '$timeout', '$rootScope', function (bmmPlaylistDemo, $timeout, $rootScope) {
  
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
          factory.setSource(bmmPlaylistDemo.getCurrent());
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
          $rootScope.$apply(function() {
            factory.getCurrentTime = $(videoTarget).data('jPlayer').
                                     status.currentTime;
            factory.getCurrentTimePercent = $(videoTarget).data('jPlayer').
                                            status.currentPercentAbsolute;
          });
        },
        ended: function() {
          //End of track
          factory.setNext();
          factory.setPlay();
        },
        resize: function() {
          //Fullscreen was toggled
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
  };

  factory.setPause = function() {
    $(videoTarget).jPlayer('pause');
  };

  factory.setStop = function() {
    $(videoTarget).jPlayer('stop');
  };

  factory.setNext = function() {
    var src = bmmPlaylistDemo.getNext();
    if (src!==false) {
      factory.setSource(src);
    }
  };

  factory.setPrevious = function() {
    var src = bmmPlaylistDemo.getPrevious();
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
      $(videoTarget).jPlayer({ fullScreen: true });
    }
  };

  factory.setVolume = function(volume) {
    $(videoTarget).jPlayer('volume', volume);
    factory.getVolume = volume;
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

  return factory;

}]);