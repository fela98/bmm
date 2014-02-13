'use strict';

angular.module('bmmLibApp')
  .directive('bmmNavigatorPlaylist', ['$timeout', 'bmmUser', function ($timeout, bmmUser) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //DEFINITIONS
            var parentWidth, mainNav, view, state='undefined';

            //PRESET
            element.addClass('bmm-navigator-playlist');

            //INITIALIZE
            $timeout(function() {
              checkWidth();
            });

            $(window).resize(function() {
              checkWidth();
            });
            
            var checkWidth = function() {

              mainNav = element.parent().find('.bmm-navigator-main');
              parentWidth = element.parent().width();
              view = element.parent().find('.bmm-view');

              if (parentWidth<600) {

                if (state!=='small') {

                  if (!bmmUser.displayNavigator||
                      bmmUser.getCurrentNavigator()!=='playlist') {

                    element.css({
                      height: 0,
                      marginLeft: -mainNav.width()
                    });

                  } else {

                    element.animate({
                      marginLeft: -mainNav.width()
                    }, 'fast', function() {
                      element.height(0);
                      view.width('100%');
                      $(window).trigger('resize');
                    });

                  }

                  state='small';

                }

              } else if (parentWidth<800&&state!=='medium') {

                if (!bmmUser.displayNavigator()&&
                    bmmUser.getCurrentNavigator()==='playlist'&&
                    state==='small'&&
                    element.height()!==0) {

                  bmmUser.displayNavigator(true);

                } else if (bmmUser.getCurrentNavigator()!=='playlist'&&
                           state==='undefined') {

                  element.css({
                    height: 0,
                    marginLeft: -mainNav.width()
                  });

                } else if (bmmUser.displayNavigator()&&
                           bmmUser.getCurrentNavigator()==='playlist') {

                  if (element.height()===0) {
                    element.height('').animate({
                      marginLeft: 0
                    }, 'fast', function() {
                      $(window).trigger('resize');
                    });
                  }

                }

                state='medium';

              } else if (state!=='large'&&parentWidth>=800) {

                state='large';

              }

            };

          }
        };
      }
    };
  }]);