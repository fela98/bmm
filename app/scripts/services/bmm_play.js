'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlay', ['bmmPlaylist', 'bmmPlayer', '$location', function (bmmPlaylist, bmmPlayer, $location) {
    
    var factory = {};

    factory.setPlay = function(playlist, index, play) {
      if (typeof index==='undefined') {
        index = 0;
      }
      if (typeof play==='undefined') {
        play = true;
      }
      var tracks = [], video, title, performers;

      $.each(playlist, function() {

        video = false;
        if (this.type==='video') {
          video = true;
        }

        title = this.title;
        performers = this.performers;
        if (this.subtype==='speech') {
          title = this.performers;
          performers = this.title;
        }

        tracks.push({
          title: title,
          subtitle: performers,
          extra: this.language,
          cover: this.cover,
          url: this.file,
          duration: this.duration,
          video: this.video
        });

      });

      bmmPlaylist.setTracks({
        tracks: tracks,
        index: index,
        url: $location.path()
      });

      if (play) {
        bmmPlayer.setSource(bmmPlaylist.getCurrent());
        bmmPlayer.setPlay();
      }

    };

    return factory;

  }]);
