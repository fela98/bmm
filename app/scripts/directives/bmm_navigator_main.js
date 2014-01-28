'use strict';

angular.module('bmmLibApp')
  .directive('bmmNavigatorMain', ['$timeout', 'bmmUser', function ($timeout, bmmUser) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //DEFINITIONS
            var parentWidth, playlistNav, view, btnToggle, btnSwitch,
            state='undefined', navSet = false;

            //PRESET
            element.addClass('bmm-navigator-main');

            //INITIALIZE
            $timeout(function() {
              checkWidth();
            });

            $(window).resize(function() {
              checkWidth();
            });
            
            var navController = function() {

              btnToggle.bind('click', function() {

                if (element.height()===0&&
                    playlistNav.height()===0) {

                  if (state==='medium') {
                    bmmUser.displayNavigator(true);
                  }

                  if (bmmUser.getCurrentNavigator()==='main') {

                    view.width('');
                    element.height('').animate({
                      marginLeft: 0
                    });

                  } else {

                    view.width('');
                    playlistNav.height('').animate({
                      marginLeft: 0
                    });

                  }

                } else {

                  if (state==='medium') {
                    bmmUser.displayNavigator(false);
                  }

                  if (bmmUser.getCurrentNavigator()==='main') {

                    element.animate({
                      marginLeft: -element.width()
                    }, 'fast', function() {
                      element.height(0);
                      view.width('100%');
                    });

                  } else {

                    playlistNav.animate({
                      marginLeft: -playlistNav.width()
                    }, 'fast', function() {
                      playlistNav.height(0);
                      view.width('100%');
                    });

                  }

                }

              });

              btnSwitch.click(function() {

                if (element.height()===0) {

                  bmmUser.setCurrentNavigator('main');
                  playlistNav.animate({
                    marginLeft: -playlistNav.width()
                  }, 'fast', function() {
                    playlistNav.height(0);

                    element.height('').animate({
                      marginLeft: 0
                    });

                  });

                } else {

                  bmmUser.setCurrentNavigator('playlist');
                  element.animate({
                    marginLeft: -element.width()
                  }, 'fast', function() {
                    element.height(0);

                    playlistNav.height('').animate({
                      marginLeft: 0
                    });

                  });

                }

              });

            };

            var checkWidth = function() {

              playlistNav = element.parent().find('.bmm-navigator-playlist');
              parentWidth = element.parent().width();
              view = element.parent().find('.bmm-view');
              btnSwitch = element.parent().find('.bmm-navigator-switch');
              btnToggle = element.parent().find('.bmm-navigator-toggle');

              btnSwitch.removeClass('load');
              btnToggle.removeClass('load');

              if (!navSet) {

                navSet = true;
                navController();

              }

              if (parentWidth<600) {

                if (state!=='small') {

                  element.parent().css({
                    margin: 0,
                    height: '100%'
                  });
                  btnToggle.show();
                  btnSwitch.show();
                  element.addClass('minified');
                  view.addClass('minified');

                  if (state==='undefined'||
                      bmmUser.getCurrentNavigator()!=='main') {

                    element.css({
                      height: 0,
                      marginLeft: -playlistNav.width()
                    });

                    if (state==='undefined') {
                      view.width('100%');
                    }

                  } else {

                    element.animate({
                      marginLeft: -playlistNav.width()
                    }, 'fast', function() {
                      element.height(0);
                      view.width('100%');
                    });

                  }

                  state='small';

                }
 
              } else if (parentWidth<800&&state!=='medium') {

                view.width('');
                element.parent().css({
                  margin: 0,
                  height: '100%'
                });
                if (bmmUser.displayNavigator()&&
                    bmmUser.getCurrentNavigator()==='main') {

                  if (state==='large') {

                    btnToggle.show();
                    btnSwitch.show();

                    element.animate({
                      height: 0
                    }, 'fast', function() {

                      element.addClass('minified');
                      view.addClass('minified');
                      element.css('marginLeft', -element.width());

                      playlistNav.animate({
                        marginLeft: -playlistNav.width()
                      }, 'fast', function() {

                        playlistNav.height(0);
                        element.height('').animate({
                          marginLeft: 0
                        });

                      });

                    });

                  } else if (element.height()===0) {
                  
                    element.height('').animate({
                      marginLeft: 0
                    });

                  } else if (state==='undefined') {

                    element.addClass('minified');
                    view.addClass('minified');
                    btnToggle.show();
                    btnSwitch.show();

                  }

                } else if (!bmmUser.displayNavigator()) {

                  btnToggle.show();
                  btnSwitch.show();

                  if (state==='large') {

                    element.animate({
                      height: 0
                    }, 'fast', function() {

                      element.addClass('minified');
                      view.addClass('minified');
                      element.css('marginLeft', -element.width());

                      playlistNav.animate({
                        marginLeft: -playlistNav.width()
                      }, 'fast', function() {
                        playlistNav.height(0);
                        view.width('100%');
                      });

                    });

                  }

                } else if (bmmUser.getCurrentNavigator()==='main') {

                  element.addClass('minified');

                  if (state==='small'&&
                      element.height()!==0) {

                    bmmUser.displayNavigator(true);

                  } else {

                    element.css({
                      marginLeft: -element.width(),
                      height: 0
                    });

                  }

                } else {

                  element.animate({
                    height: 0
                  }, 'fast', function() {

                    if (state!=='large') {
                      element.css({
                        marginLeft: -element.width()
                      });
                      element.addClass('minified');
                      btnToggle.fadeIn();
                      btnSwitch.fadeIn();
                      view.addClass('minified');
                    }

                  });

                }

                state='medium';

              } else if (parentWidth>=800&&state!=='large') {

                element.parent().css({
                  margin: '',
                  height: ''
                });
                view.width('');
                if ((state==='medium'||state==='small')&&
                    bmmUser.getCurrentNavigator()==='main') {

                  btnToggle.hide();
                  btnSwitch.hide();

                  element.animate({
                    marginLeft: -element.width()
                  }, 'fast', function() {

                    element.removeClass('minified');
                    view.removeClass('minified');
                    element.css({
                      marginLeft: '',
                      height: ''
                    });

                    playlistNav.height('').animate({
                      marginLeft: 0
                    }, 'fast', function() {
                      playlistNav.css({
                        marginLeft: ''
                      });
                    });

                  });

                } else if (playlistNav.height()===0) {

                  btnToggle.hide();
                  btnSwitch.hide();

                  element.removeClass('minified');
                  view.removeClass('minified');
                  element.css({
                    marginLeft: '',
                    height: ''
                  });

                  playlistNav.height('').animate({
                    marginLeft: 0
                  }, 'fast');

                } else {

                  btnToggle.hide();
                  btnSwitch.hide();

                  element.removeClass('minified');
                  view.removeClass('minified');
                  element.css({
                    marginLeft: '',
                    height: ''
                  });

                }

                state = 'large';

              }

            };

          }
        };
      }
    };
  }]);