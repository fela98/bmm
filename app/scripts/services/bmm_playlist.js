'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlaylist', ['bmmShuffle', function (bmmShuffle) {
    
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

        tracks = options.playlist;
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