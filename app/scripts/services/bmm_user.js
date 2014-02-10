'use strict';

angular.module('bmmLibApp')
  .factory('bmmUser', [function () {

    var factory = {},
        video = {},
        currentNavigator = 'main', //Options ['main', 'playlist']
        displayNavigator = true;

    video.screen = {};
    video.screen.height = '180';
    video.screen.width = '180';

    factory.getScreenWidth = function() {
      return video.screen.width;
    };

    factory.getScreenHeight = function() {
      return video.screen.height;
    };

    factory.getCurrentNavigator = function() {
      return currentNavigator;
    };

    factory.setScreenWidth = function(width) {
      video.screen.width = width;
    };

    factory.setScreenHeight = function(height) {
      video.screen.height = height;
    };

    factory.setCurrentNavigator = function(nav) {
      currentNavigator = nav;
    };

    factory.displayNavigator = function(display) {
      
      if (typeof display!=='undefined') {
        displayNavigator = display;
      }

      return displayNavigator;

    };

    return factory;

  }]);
