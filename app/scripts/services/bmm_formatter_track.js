'use strict';

angular.module('bmmLibApp')
  .factory('bmmFormatterTrack', [ function () {
    
    var factory = {};

    factory.resolve = function(data) {

      var resolvedData = {};

      if (typeof data.cover!=='undefined') {

        resolvedData.cover = data.cover;

      } else {

        //Find album cover image url
        if (typeof data._meta!=='undefined'&&
            typeof data._meta.parent!=='undefined'&&
            typeof data._meta.parent.cover!=='undefined'&&
            data._meta.parent.cover!==null) {
          resolvedData.cover = data._meta.parent.cover;
        } else {

          switch(data.subtype) {
            case 'speech':
              resolvedData.cover='fallback_images/svg/speech.svg';
              break;
            case 'song':
            case 'singsong':
            case 'audiobook':
              resolvedData.cover='fallback_images/svg/song.svg';
              break;
            case 'video':
              resolvedData.cover='fallback_images/svg/video.svg';
              break;
            default:
              resolvedData.cover='fallback_images/svg/person.svg';
              break;
          }

        }

      }

      //Find parent title
      if (typeof data._meta!=='undefined'&&
          typeof data._meta.parent!=='undefined'&&
          typeof data._meta.parent.title!=='undefined') {
        resolvedData.parentTitle = data._meta.parent.title;
      } else {
        resolvedData.parentTitle='';
      }

      //Find file type, url and length
      if (typeof data.media!=='undefined'&&data.media.length>0) {
        $.each( data.media, function() {

          resolvedData.file = this.files[0].url;
          resolvedData.duration = Number(this.files[0].length);
          resolvedData.type = this.type;

          //Keep search while no video is found and more files available
          if (this.type==='video') {
            return;
          }

        });
      }

      //Find title
      resolvedData.title = '';
      if (typeof data.title!=='undefined') {
        resolvedData.title = data.title;
      }

      //Find all relations
      if (typeof data.rel!=='undefined') {

        resolvedData.relations = {};

        //Sort relations to objects based on type
        $.each(data.rel, function() {

          var currentRelation = this;
          
          //Check that relation 'type' is created
          if (typeof resolvedData.relations[currentRelation.type]==='undefined') {
            resolvedData.relations[currentRelation.type] = [];
          }

          //Create object without type defined in object
          var newRelation = {};

          for (var key in currentRelation) {
            if (key!=='type') {
              newRelation[key] = currentRelation[key];
            }
          }

          //Push new object to relations with content of 'type'
          resolvedData.relations[currentRelation.type].push(newRelation);

        });

        //Expected relations
        resolvedData.performers = '';
        resolvedData.bible = '';
        resolvedData.unsorted = '';

        //Format relations to strings
        $.each(resolvedData.relations, function(key) {

          switch (key) {
            case 'interpret':

              $.each(resolvedData.relations[key], function(index) {
                if ((resolvedData.relations[key].length-1)===index) {
                  resolvedData.performers+= this.name;
                } else if ((resolvedData.relations[key].length-2)===index) {
                  resolvedData.performers+= this.name+' og ';
                } else {
                  resolvedData.performers+= this.name+', ';
                }
              });

              break;
            case 'bible':

              $.each(resolvedData.relations[key], function(index) {
                if ((resolvedData.relations[key].length-1)===index) {
                  resolvedData.bible+= this.book+' '+this.chapter+':'+this.verse;
                } else if ((resolvedData.relations[key].length-2)===index) {
                  resolvedData.bible+= this.book+' '+this.chapter+':'+this.verse+' og ';
                } else {
                  resolvedData.bible+= this.book+' '+this.chapter+':'+this.verse+', ';
                }
              });

              break;
            default:

              resolvedData.unsorted+='<b>'+key+':</b> ';
              $.each(resolvedData.relations[key], function(index) {
                if ((resolvedData.relations[key].length-1)===index) {
                  resolvedData.unsorted+= this.name;
                } else if ((resolvedData.relations[key].length-2)===index) {
                  resolvedData.unsorted+= this.name+' og ';
                } else {
                  resolvedData.unsorted+= this.name+', ';
                }
              });
              resolvedData.unsorted+='<br>';

              break;
          }

        });

        //id
        resolvedData.id = data.id;

        //language
        resolvedData.language = data.language;

        //date
        resolvedData.date = data.published_at;

        //subtype
        resolvedData.subtype = data.subtype;

        //Combined title
        var bindSign = ' - ';
        if (resolvedData.performers===''&&resolvedData.title==='') {
          bindSign = 'Ukjent';
        } else if (resolvedData.performers===''||resolvedData.title==='') {
          bindSign = '';
        }
        
        if (resolvedData.subtype==='speech') {
          resolvedData.combinedTitle = resolvedData.performers + bindSign + resolvedData.title;
        } else {
          resolvedData.combinedTitle = resolvedData.title + bindSign + resolvedData.performers;
        }

        if (resolvedData.title === '') {
          resolvedData.title = 'Ukjent';
        }

      }

      /**
       * Returns: file, duration, type (filetype), performers, title, cover, bible, parentTitle, subtype,
       *          combinedTitle
       */

      return resolvedData;

    };

    return factory;

  }]);
