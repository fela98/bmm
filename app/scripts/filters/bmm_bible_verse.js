'use strict';

angular.module('bmmLibApp')
  .filter('bmmBibleVerse', ['bmmTranslator', function (bmmTranslator) {
    return function (input) {

      var output=[];
      if (typeof input!=='undefined'&&input!=='') {

        //minified will contain bibleverses shortened from 2-3 letters
        var minified={};

        //For all translations, copy a 2-3 letter bibleverse into minified
        $.each(bmmTranslator.get(), function(key) {

          //Make sure translation is lowercase
          var threeLtr = this.toLowerCase();
          //Filter out strange characters (Blacklist)
          //Whitelist is not recomended as multiple languages is suported
          threeLtr = threeLtr.replace(/[\s\.¦:;¶*~"'_\\\/\-\,><!$£#¤%&=+?|{}\[\]¨^`´@]/g,'');
          //Copy first 3 letters
          threeLtr = threeLtr.substring(0,3);
          //Use the same key as translationfile and set converted string
          minified[key] = threeLtr;

        });

        /**
         *  Make lowercase, remove all dots and spaces
         *  Split string into array by commas
         */
        input = input.toLowerCase();
        input = input.replace(/\.\s/g,'');
        input = input.split(',');

        //For each comma separated string
        $.each(input, function() {

          //Sort by book, chapter and verses
          var book={}, data, bookEnd;

          data = this;

          //Find length of book
          bookEnd=-1;
          for (var i=0; i < data.length; i++) {
            //If the third character or greater is numeric
            if (i>1&&data[i].match(/^\d+$/)) {
              bookEnd=i-1; //Start of chapter found
              break;
            }
          }

          //If not start of chapter was found
          if (bookEnd===-1) {
            book.name = data;
            data = '';
          //If start of chapter was found
          } else {
            book.name = data.substring(0,(bookEnd+1));
            data = data.substring(bookEnd+1);
          }

          //Filter out strange characters (Blacklist)
          //Whitelist is not recomended as multiple languages is suported
          book.name = book.name.replace(/[¦:;¶*~"'_\\\/\-\,><!$£#¤%&=+?|{}\[\]¨^`´@]/g,'');

          /**
           *  ---- BOOK IS NOW FOUND, CHAPTER NEXT ----
           */
          
          book.chapters = [];

          //Set ; and + as :
          data = data.replace(/[;+]/g,':');
          //Remove all characters thats not in the list
          data = data.replace(/[^0-9&:\-]/g,'');

          //Split chapters based on &
          $.each(data.split('&'), function() {

            var results = this.split(':'), chapter={};
            chapter.verses=[];

            $.each(results, function(index) {

              //First in array equals chapter
              if (index===0&&this>0) {
                chapter.number = Number(this);
              //Other in array equals verses
              } else {
                
                //If single verse
                if (this.indexOf('-')===-1) {
                  if (this>0) {
                    chapter.verses.push(Number(this));
                  }
                //If verses [from-to]
                } else {
                  var verseFromTo = this.split('-');
                  if (verseFromTo[0]!=='') {

                    //If last verse is less than first, make it equal
                    if (verseFromTo[1]===''||Number(verseFromTo[1])<Number(verseFromTo[0])) {
                      verseFromTo[1] = verseFromTo[0];
                    }

                    //Add all verses
                    for (var i = verseFromTo[0]; i<=verseFromTo[1]; i++) {
                      if (i>0) {
                        chapter.verses.push(Number(i));
                      }
                    }

                  }
                  
                }

              }

            });

            book.chapters.push(chapter);

          });

          switch (book.name) {
            case minified.bibleGenesisShort:
              book.name = bmmTranslator.get().bibleGenesis;
              break;
            case minified.bibleExodusShort:
              book.name = bmmTranslator.get().bibleExodus;
              break;
            case minified.bibleLeviticusShort:
              book.name = bmmTranslator.get().bibleLeviticus;
              break;
            case minified.bibleNumbersShort:
              book.name = bmmTranslator.get().bibleNumbers;
              break;
            case minified.bibleDeuteronomyShort:
              book.name = bmmTranslator.get().bibleDeuteronomy;
              break;
            case minified.bibleJoshuaShort:
              book.name = bmmTranslator.get().bibleJoshua;
              break;
            case minified.bibleJudgesShort:
              book.name = bmmTranslator.get().bibleJudges;
              break;
            case minified.bibleRuthShort:
              book.name = bmmTranslator.get().bibleRuth;
              break;
            case minified.bibleFirstSamuelShort:
              book.name = bmmTranslator.get().bibleFirstSamuel;
              break;
            case minified.bibleSecondSamuelShort:
              book.name = bmmTranslator.get().bibleSecondSamuel;
              break;
            case minified.bibleFirstKingsShort:
              book.name = bmmTranslator.get().bibleFirstKings;
              break;
            case minified.bibleSecondKingsShort:
              book.name = bmmTranslator.get().bibleSecondKings;
              break;
            case minified.bibleFirstChroniclesShort:
              book.name = bmmTranslator.get().bibleFirstChronicles;
              break;
            case minified.bibleSecondChroniclesShort:
              book.name = bmmTranslator.get().bibleSecondChronicles;
              break;
            case minified.bibleEzraShort:
              book.name = bmmTranslator.get().bibleEzra;
              break;
            case minified.bibleNehemiahShort:
              book.name = bmmTranslator.get().bibleNehemiah;
              break;
            case minified.bibleTobitShort:
              book.name = bmmTranslator.get().bibleTobit;
              break;
            case minified.bibleJudithShort:
              book.name = bmmTranslator.get().bibleJudith;
              break;
            case minified.bibleEstherShort:
              book.name = bmmTranslator.get().bibleEsther;
              break;
            case minified.bibleFirstMaccabeesShort:
              book.name = bmmTranslator.get().bibleFirstMaccabees;
              break;
            case minified.bibleSecondMaccabeesShort:
              book.name = bmmTranslator.get().bibleSecondMaccabees;
              break;
            case minified.bibleJobShort:
              book.name = bmmTranslator.get().bibleJob;
              break;
            case minified.biblePsalmsShort:
              book.name = bmmTranslator.get().biblePsalms;
              break;
            case minified.bibleProverbsShort:
              book.name = bmmTranslator.get().bibleProverbs;
              break;
            case minified.bibleEcclesiastesShort:
              book.name = bmmTranslator.get().bibleEcclesiastes;
              break;
            case minified.bibleSongOfSongsShort:
              book.name = bmmTranslator.get().bibleSongOfSongs;
              break;
            case minified.bibleWisdomShort:
              book.name = bmmTranslator.get().bibleWisdom;
              break;
            case minified.bibleSirachShort:
              book.name = bmmTranslator.get().bibleSirach;
              break;
            case minified.bibleIsaiahShort:
              book.name = bmmTranslator.get().bibleIsaiah;
              break;
            case minified.bibleJeremiahShort:
              book.name = bmmTranslator.get().bibleJeremiah;
              break;
            case minified.bibleLamentationsShort:
              book.name = bmmTranslator.get().bibleLamentations;
              break;
            case minified.bibleBaruchShort:
              book.name = bmmTranslator.get().bibleBaruch;
              break;
            case minified.bibleEzekielShort:
              book.name = bmmTranslator.get().bibleEzekiel;
              break;
            case minified.bibleDanielShort:
              book.name = bmmTranslator.get().bibleDaniel;
              break;
            case minified.bibleHoseaShort:
              book.name = bmmTranslator.get().bibleHosea;
              break;
            case minified.bibleJoelShort:
              book.name = bmmTranslator.get().bibleJoel;
              break;
            case minified.bibleAmosShort:
              book.name = bmmTranslator.get().bibleAmos;
              break;
            case minified.bibleObadiahShort:
              book.name = bmmTranslator.get().bibleObadiah;
              break;
            case minified.bibleJonahShort:
              book.name = bmmTranslator.get().bibleJonah;
              break;
            case minified.bibleMicahShort:
              book.name = bmmTranslator.get().bibleMicah;
              break;
            case minified.bibleNahumShort:
              book.name = bmmTranslator.get().bibleNahum;
              break;
            case minified.bibleHabakkukShort:
              book.name = bmmTranslator.get().bibleHabakkuk;
              break;
            case minified.bibleZephaniahShort:
              book.name = bmmTranslator.get().bibleZephaniah;
              break;
            case minified.bibleHaggaiShort:
              book.name = bmmTranslator.get().bibleHaggai;
              break;
            case minified.bibleZechariahShort:
              book.name = bmmTranslator.get().bibleZechariah;
              break;
            case minified.bibleMalachiShort:
              book.name = bmmTranslator.get().bibleMalachi;
              break;
            case minified.bibleMatthewShort:
              book.name = bmmTranslator.get().bibleMatthew;
              break;
            case minified.bibleMarkShort:
              book.name = bmmTranslator.get().bibleMark;
              break;
            case minified.bibleLukeShort:
              book.name = bmmTranslator.get().bibleLuke;
              break;
            case minified.bibleJohnShort:
              book.name = bmmTranslator.get().bibleJohn;
              break;
            case minified.bibleActsOfTheApostlesShort:
              book.name = bmmTranslator.get().bibleActsOfTheApostles;
              break;
            case minified.bibleRomansShort:
              book.name = bmmTranslator.get().bibleRomans;
              break;
            case minified.bibleFirstCorinthiansShort:
              book.name = bmmTranslator.get().bibleFirstCorinthians;
              break;
            case minified.bibleSecondCorinthiansShort:
              book.name = bmmTranslator.get().bibleSecondCorinthians;
              break;
            case minified.bibleGalatiansShort:
              book.name = bmmTranslator.get().bibleGalatians;
              break;
            case minified.bibleEphesiansShort:
              book.name = bmmTranslator.get().bibleEphesians;
              break;
            case minified.biblePhilippiansShort:
              book.name = bmmTranslator.get().biblePhilippians;
              break;
            case minified.bibleColossiansShort:
              book.name = bmmTranslator.get().bibleColossians;
              break;
            case minified.bibleFirstThessaloniansShort:
              book.name = bmmTranslator.get().bibleFirstThessalonians;
              break;
            case minified.bibleSecondThessaloniansShort:
              book.name = bmmTranslator.get().bibleSecondThessalonians;
              break;
            case minified.bibleFirstTimothyShort:
              book.name = bmmTranslator.get().bibleFirstTimothy;
              break;
            case minified.bibleSecondTimothyShort:
              book.name = bmmTranslator.get().bibleSecondTimothy;
              break;
            case minified.bibleTitusShort:
              book.name = bmmTranslator.get().bibleTitus;
              break;
            case minified.biblePhilemonShort:
              book.name = bmmTranslator.get().biblePhilemon;
              break;
            case minified.bibleHebrewsShort:
              book.name = bmmTranslator.get().bibleHebrews;
              break;
            case minified.bibleJamesShort:
              book.name = bmmTranslator.get().bibleJames;
              break;
            case minified.bibleFirstPeterShort:
              book.name = bmmTranslator.get().bibleFirstPeter;
              break;
            case minified.bibleSecondPeterShort:
              book.name = bmmTranslator.get().bibleSecondPeter;
              break;
            case minified.bibleFirstJohnShort:
              book.name = bmmTranslator.get().bibleFirstJohn;
              break;
            case minified.bibleSecondJohnShort:
              book.name = bmmTranslator.get().bibleSecondJohn;
              break;
            case minified.bibleThirdJohnShort:
              book.name = bmmTranslator.get().bibleThirdJohn;
              break;
            case minified.bibleJudeShort:
              book.name = bmmTranslator.get().bibleJude;
              break;
            case minified.bibleRevelationShort:
              book.name = bmmTranslator.get().bibleRevelation;
              break;
            default:
              book.name = false;
          }

          if (book.name!==false) {
            output.push(book);
          }

        });
      }

      return output;

    };
  }]);
