'use strict';

angular.module('bmmLibApp')
  .factory('bmmPlaylist', ['bmmShuffle', function (bmmShuffle) {
    
    var factory = {},
        url=false,
        shuffle=false,
        repeat=false,
        tracks=[],
        shuffleList=[],
        shuffledList=[];

    factory.setTracks = function(options) {

      //Required
      if (typeof options.tracks!=='undefined') {

        if (!$.isArray(options.tracks)) {
          options.tracks = [options.tracks];
        }

        tracks = options.tracks;

      } else {
        return false;
      }

      if (typeof options.index!=='undefined'&&
         (options.index>=0||options.index<tracks.length)) {
        factory.index = options.index;
      } else {
        factory.index = 0;
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

      shuffleList = [];
      shuffledList = [];
      $.each(tracks, function(index) {
        shuffleList.push(index);
      });

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
        return tracks[factory.index];
      } else {
        return false;
      }
    };

    factory.getNext = function() {

      if (shuffle) {

        if (shuffleList.length===0&&repeat) {
          factory.setShuffle(true); //Creates new list
        } else if (shuffleList.length===0&&!repeat) {
          return false;
        }

        var index = Math.floor(Math.random() * shuffleList.length)
        factory.index = shuffleList[index];
        shuffledList.push(index);
        shuffleList.splice(index,1);

        return factory.getCurrent();

      } else if (factory.index<(tracks.length-1)) {
        factory.index++;
        return factory.getCurrent();
      } else if (repeat) {
        factory.index=0;
        return factory.getCurrent();
      } else {
        return false;
      }

    };

    factory.getPrevious = function() {

      if (shuffle) {

        if (shuffledList.length!==0) {
          factory.index= shuffledList[shuffledList.length];
          shuffledList.pop();
          return factory.getCurrent();
        } else {
          return false;
        }

      } else if (factory.index>0) {
        factory.index--;
        return factory.getCurrent();
      } else if (repeat) {
        factory.index=(tracks.length-1);
        return factory.getCurrent();
      } else {
        return false;
      }

    };

    factory.index = 0;

    return factory;
    
  }]);