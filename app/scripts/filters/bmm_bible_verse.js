'use strict';

angular.module('bmmLibApp')
  .filter('bmmBibleVerse', ['bmmTranslator', function (bmmTranslator) {
    return function (input) {

      var output=' ';

      if (typeof input!=='undefined') {

        var minified={};

        $.each(bmmTranslator.get(), function(key) {

          var threeLtr = bmmTranslator.get()[key];

          threeLtr = threeLtr.toLowerCase();
          threeLtr = threeLtr.replace(/\s/g,'');
          threeLtr = threeLtr.substring(0,3);

          minified[key] = threeLtr;

        });

        input = input.toLowerCase();
        input = input.replace(/\s+/g,' ');
        input = input.replace(/\./g,'');
        input = input.split(',');

        $.each(input, function() {

          var chapter, start, end, results='', data;

          data = this;
          data = data.toLowerCase();

          if (data.substring(0,1)===' ') {
            data = data.replace(' ','');
          }

          if ((data.substring(0,1)).match(/^\d+$/)&&
              (data.substring(1,2)===' ')) {
            data = data.replace(' ','');
          }

          data = data.split(' ');

          if (typeof data[0]==='undefined') { data[0] = ''; }
          if (typeof data[1]==='undefined') { data[1] = ''; }

          chapter = data[0];
          chapter = chapter.substring(0,3);
          start = data[1].split('-');
          end = start[1];
          start = start[0];

          switch (chapter) {
            case minified.bibleGenesisShort:
              chapter = bmmTranslator.get().bibleGenesis;
              break;
            case minified.bibleExodusShort:
              chapter = bmmTranslator.get().bibleExodus;
              break;
            case minified.bibleLeviticusShort:
              chapter = bmmTranslator.get().bibleLeviticus;
              break;
            case minified.bibleNumbersShort:
              chapter = bmmTranslator.get().bibleNumbers;
              break;
            case minified.bibleDeuteronomyShort:
              chapter = bmmTranslator.get().bibleDeuteronomy;
              break;
            case minified.bibleJoshuaShort:
              chapter = bmmTranslator.get().bibleJoshua;
              break;
            case minified.bibleJudgesShort:
              chapter = bmmTranslator.get().bibleJudges;
              break;
            case minified.bibleRuthShort:
              chapter = bmmTranslator.get().bibleRuth;
              break;
            case minified.bibleFirstSamuelShort:
              chapter = bmmTranslator.get().bibleFirstSamuel;
              break;
            case minified.bibleSecondSamuelShort:
              chapter = bmmTranslator.get().bibleSecondSamuel;
              break;
            case minified.bibleFirstKingsShort:
              chapter = bmmTranslator.get().bibleFirstKings;
              break;
            case minified.bibleSecondKingsShort:
              chapter = bmmTranslator.get().bibleSecondKings;
              break;
            case minified.bibleFirstChroniclesShort:
              chapter = bmmTranslator.get().bibleFirstChronicles;
              break;
            case minified.bibleSecondChroniclesShort:
              chapter = bmmTranslator.get().bibleSecondChronicles;
              break;
            case minified.bibleEzraShort:
              chapter = bmmTranslator.get().bibleEzra;
              break;
            case minified.bibleNehemiahShort:
              chapter = bmmTranslator.get().bibleNehemiah;
              break;
            case minified.bibleTobitShort:
              chapter = bmmTranslator.get().bibleTobit;
              break;
            case minified.bibleJudithShort:
              chapter = bmmTranslator.get().bibleJudith;
              break;
            case minified.bibleEstherShort:
              chapter = bmmTranslator.get().bibleEsther;
              break;
            case minified.bibleFirstMaccabeesShort:
              chapter = bmmTranslator.get().bibleFirstMaccabees;
              break;
            case minified.bibleSecondMaccabeesShort:
              chapter = bmmTranslator.get().bibleSecondMaccabees;
              break;
            case minified.bibleJobShort:
              chapter = bmmTranslator.get().bibleJob;
              break;
            case minified.biblePsalmsShort:
              chapter = bmmTranslator.get().biblePsalms;
              break;
            case minified.bibleProverbsShort:
              chapter = bmmTranslator.get().bibleProverbs;
              break;
            case minified.bibleEcclesiastesShort:
              chapter = bmmTranslator.get().bibleEcclesiastes;
              break;
            case minified.bibleSongOfSongsShort:
              chapter = bmmTranslator.get().bibleSongOfSongs;
              break;
            case minified.bibleWisdomShort:
              chapter = bmmTranslator.get().bibleWisdom;
              break;
            case minified.bibleSirachShort:
              chapter = bmmTranslator.get().bibleSirach;
              break;
            case minified.bibleIsaiahShort:
              chapter = bmmTranslator.get().bibleIsaiah;
              break;
            case minified.bibleJeremiahShort:
              chapter = bmmTranslator.get().bibleJeremiah;
              break;
            case minified.bibleLamentationsShort:
              chapter = bmmTranslator.get().bibleLamentations;
              break;
            case minified.bibleBaruchShort:
              chapter = bmmTranslator.get().bibleBaruch;
              break;
            case minified.bibleEzekielShort:
              chapter = bmmTranslator.get().bibleEzekiel;
              break;
            case minified.bibleDanielShort:
              chapter = bmmTranslator.get().bibleDaniel;
              break;
            case minified.bibleHoseaShort:
              chapter = bmmTranslator.get().bibleHosea;
              break;
            case minified.bibleJoelShort:
              chapter = bmmTranslator.get().bibleJoel;
              break;
            case minified.bibleAmosShort:
              chapter = bmmTranslator.get().bibleAmos;
              break;
            case minified.bibleObadiahShort:
              chapter = bmmTranslator.get().bibleObadiah;
              break;
            case minified.bibleJonahShort:
              chapter = bmmTranslator.get().bibleJonah;
              break;
            case minified.bibleMicahShort:
              chapter = bmmTranslator.get().bibleMicah;
              break;
            case minified.bibleNahumShort:
              chapter = bmmTranslator.get().bibleNahum;
              break;
            case minified.bibleHabakkukShort:
              chapter = bmmTranslator.get().bibleHabakkuk;
              break;
            case minified.bibleZephaniahShort:
              chapter = bmmTranslator.get().bibleZephaniah;
              break;
            case minified.bibleHaggaiShort:
              chapter = bmmTranslator.get().bibleHaggai;
              break;
            case minified.bibleZechariahShort:
              chapter = bmmTranslator.get().bibleZechariah;
              break;
            case minified.bibleMalachiShort:
              chapter = bmmTranslator.get().bibleMalachi;
              break;
            case minified.bibleMatthewShort:
              chapter = bmmTranslator.get().bibleMatthew;
              break;
            case minified.bibleMarkShort:
              chapter = bmmTranslator.get().bibleMark;
              break;
            case minified.bibleLukeShort:
              chapter = bmmTranslator.get().bibleLuke;
              break;
            case minified.bibleJohnShort:
              chapter = bmmTranslator.get().bibleJohn;
              break;
            case minified.bibleActsOfTheApostlesShort:
              chapter = bmmTranslator.get().bibleActsOfTheApostles;
              break;
            case minified.bibleRomansShort:
              chapter = bmmTranslator.get().bibleRomans;
              break;
            case minified.bibleFirstCorinthiansShort:
              chapter = bmmTranslator.get().bibleFirstCorinthians;
              break;
            case minified.bibleSecondCorinthiansShort:
              chapter = bmmTranslator.get().bibleSecondCorinthians;
              break;
            case minified.bibleGalatiansShort:
              chapter = bmmTranslator.get().bibleGalatians;
              break;
            case minified.bibleEphesiansShort:
              chapter = bmmTranslator.get().bibleEphesians;
              break;
            case minified.biblePhilippiansShort:
              chapter = bmmTranslator.get().biblePhilippians;
              break;
            case minified.bibleColossiansShort:
              chapter = bmmTranslator.get().bibleColossians;
              break;
            case minified.bibleFirstThessaloniansShort:
              chapter = bmmTranslator.get().bibleFirstThessalonians;
              break;
            case minified.bibleSecondThessaloniansShort:
              chapter = bmmTranslator.get().bibleSecondThessalonians;
              break;
            case minified.bibleFirstTimothyShort:
              chapter = bmmTranslator.get().bibleFirstTimothy;
              break;
            case minified.bibleSecondTimothyShort:
              chapter = bmmTranslator.get().bibleSecondTimothy;
              break;
            case minified.bibleTitusShort:
              chapter = bmmTranslator.get().bibleTitus;
              break;
            case minified.biblePhilemonShort:
              chapter = bmmTranslator.get().biblePhilemon;
              break;
            case minified.bibleHebrewsShort:
              chapter = bmmTranslator.get().bibleHebrews;
              break;
            case minified.bibleJamesShort:
              chapter = bmmTranslator.get().bibleJames;
              break;
            case minified.bibleFirstPeterShort:
              chapter = bmmTranslator.get().bibleFirstPeter;
              break;
            case minified.bibleSecondPeterShort:
              chapter = bmmTranslator.get().bibleSecondPeter;
              break;
            case minified.bibleFirstJohnShort:
              chapter = bmmTranslator.get().bibleFirstJohn;
              break;
            case minified.bibleSecondJohnShort:
              chapter = bmmTranslator.get().bibleSecondJohn;
              break;
            case minified.bibleThirdJohnShort:
              chapter = bmmTranslator.get().bibleThirdJohn;
              break;
            case minified.bibleJudeShort:
              chapter = bmmTranslator.get().bibleJude;
              break;
            case minified.bibleRevelationShort:
              chapter = bmmTranslator.get().bibleRevelation;
              break;
            default:
              chapter = false;
          }

          if (start<1||start>999||!(start+'').match(/^\d+$/)) { start = false; }
          if (end<1||end>999||!(end+'').match(/^\d+$/)) { end = false; }

          if (chapter!==false) {

            results+=chapter;

            if (start!==false) {

              results+=' '+start;

              if (end!==false&&Number(end)>Number(start)) {

                results+='-'+end;

              }

            }

          }

          results+=', ';

          if (results!==', ') {
            output+=results;
          }
          
        });
      }
      
      return output;

    };
  }]);
