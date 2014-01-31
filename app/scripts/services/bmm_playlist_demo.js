'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlaylistDemo', ['bmmShuffle', function (bmmShuffle) {
    
    var factory = {},
        index=0,
        title='',
        url=false,
        shuffle=false,
        repeat=false,
        tracks=[], //Original sorting
        tracksPlaying=[], //In use (either tracks or tracksShuffled)
        tracksShuffled=[]; //Shuffled sorting

    factory.setTracks = function(options) {

      //Required
      if (typeof options.tracks!=='undefined') {

        if (!$.isArray(options.tracks)) {
          options.tracks = [options.tracks];
        }

        tracks = options.tracks;
        //Slice make it copy instead of reference
        tracksShuffled = bmmShuffle(options.tracks.slice(0));

        if (shuffle) {
          tracksPlaying = tracksShuffled;
        } else {
          tracksPlaying = tracks;
        }

      } else {
        return false;
      }

      if (typeof options.index!=='undefined'&&
         (options.index>=0||options.index<tracks.length)) {
        index = options.index;
      } else {
        index = 0;
      }

      if (typeof options.title!=='undefined') {
        title = options.title;
      } else {
        title = '';
      }

      if (typeof options.url!=='undefined') {
        url = options.url;
      } else {
        url = false;
      }

    };

    factory.setTracks({
      tracks: [
        {
          title: 'Tittel a',
          subtitle: 'Undertittel a',
          extra: 'Extra a',
          url: 'testmedia/musikk/a.mp3',
          duration: 4321,
          video: false
        },
        {
          title: 'Tittel b',
          subtitle: 'Undertittel b',
          extra: 'Extra b',
          url: 'testmedia/musikk/b.mp3',
          duration: 2121,
          video: false
        },
        {
          title: 'Tittel c',
          subtitle: 'Undertittel c',
          extra: 'Extra c',
          url: 'testmedia/musikk/c.mp3',
          duration: 3441,
          video: false
        },
        {
          title: 'Tittel d',
          subtitle: 'Undertittel d',
          extra: 'Extra d',
          url: 'testmedia/musikk/d.mp3',
          duration: 4321,
          video: false
        },
        {
          title: 'Tittel e',
          subtitle: 'Undertittel e',
          extra: 'Extra e',
          url: 'testmedia/musikk/e.mp3',
          duration: 2121,
          video: false
        },
        {
          title: 'Tittel f',
          subtitle: 'Undertittel f',
          extra: 'Extra f',
          url: 'testmedia/musikk/f.mp3',
          duration: 3441,
          video: false
        },
        {
          title: 'Tittel g',
          subtitle: 'Undertittel g',
          extra: 'Extra g',
          url: 'testmedia/musikk/g.mp3',
          duration: 3441,
          video: false
        },
        {
          title: 'Tittel va',
          subtitle: 'Undertittel a',
          extra: 'Extra a',
          url: 'testmedia/video/a.mp4',
          duration: 4321,
          video: true
        },
        {
          title: 'Tittel vb',
          subtitle: 'Undertittel b',
          extra: 'Extra b',
          url: 'testmedia/video/b.mp4',
          duration: 2121,
          video: true
        },
        {
          title: 'Tittel vc',
          subtitle: 'Undertittel c',
          extra: 'Extra c',
          url: 'testmedia/video/c.mp4',
          duration: 3441,
          video: true
        },
        {
          title: 'Tittel vd',
          subtitle: 'Undertittel d',
          extra: 'Extra d',
          url: 'testmedia/video/d.mp4',
          duration: 4321,
          video: true
        },
        {
          title: 'Tittel ve',
          subtitle: 'Undertittel e',
          extra: 'Extra e',
          url: 'testmedia/video/e.mp4',
          duration: 2121,
          video: true
        }
      ],
      index: 2,
      title: 'Test tittel',
      url: 'path/to/playlist'
    });

    factory.setShuffle = function(bool) {

      if (typeof bool!== 'undefined') {
        shuffle = bool;
      } else {
        shuffle = !shuffle;
      }

      if (shuffle) {
        tracksPlaying = tracksShuffled;
      } else {
        tracksPlaying = tracks;
      }

      return shuffle;

    };

    factory.setRepeat = function(bool) {
      if (typeof bool!== 'undefined') {
        repeat = bool;
      } else {
        repeat = !repeat;
      }
      return repeat;
    };

    factory.getUrl = function() {
      return url;
    };

    factory.getTitle = function() {
      return title;
    };

    factory.getDuration = function() {

      //Required
      if (typeof tracks!=='undefined') {

        var duration=0;

        $.each(tracks, function() {
          duration+= this.duration;
        });

        return duration;

      } else {
        return false;
      }

    };

    factory.getCurrent = function() {
      if (tracks.length) {
        return tracksPlaying[index];
      } else {
        return false;
      }
    };

    factory.getNext = function() {

      if (index<(tracks.length-1)) {
        index++;
        return factory.getCurrent();
      } else if (repeat) {
        index=0;
        return factory.getCurrent();
      } else {
        return false;
      }

    };

    factory.getPrevious = function() {

      if (index>0) {
        index--;
        return factory.getCurrent();
      } else if (repeat) {
        index=(tracks.length-1);
        return factory.getCurrent();
      } else {
        return false;
      }

    };

    return factory;
    
  }]);