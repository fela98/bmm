'use strict';

angular.module('bmmLibApp')
  .filter('bmmLanguage', function () {
    return function (lang) {

      var languageNames = {
        nb: 'Norsk',
        af: 'Afrikaans',
        bg: 'български език',
        cs: 'čeština',
        de: 'Deutsch',
        en: 'English',
        es: 'español',
        fi: 'suomi',
        fr: 'français',
        hr: 'hrvatski',
        hu: 'Magyar',
        it: 'Italiano',
        nl: 'Nederlands',
        pl: 'polski',
        pt: 'Português',
        ro: 'română',
        ru: 'Русский язык',
        tr: 'Türkçe',
        zh: '中文',
        zxx: 'Unknown'
      };

      if (typeof languageNames[lang]!=='undefined') {
        return languageNames[lang];
      } else {
        return 'Unknown';
      }

    };
  });