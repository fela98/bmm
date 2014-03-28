'use strict';

angular.module('bmmLibApp')
  .directive('bmmContainerMain', ['$timeout', function ($timeout) {
    return {
      compile : function() {
        return {
          pre : function(scope, element) {

            //Save elements in cache
            var minified = false,
                mainHeader = $('.bmm-container-header.main'),
                playlistNav = $('.bmm-navigator-playlist'),
                backendNav = $('.bmm-navigator-backend'),
                target = $('.bmm-player-target'),
                bmmView = $('.bmm-view'),
                h = $(window).height(), w = $(window).width();

            //PRESET
            element.addClass('bmm-container-main');

            $(element).bind('scroll', function() {
              if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
                $('.bmm-view').trigger('scrollBottom');
              }
            });

            $(element.find('.bmm-view')).bind('scroll', function() {
              if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight) {
                $('.bmm-view').trigger('scrollBottom');
              }
            });

            if(mainHeader.css('display')==='none') {
              minified = true;
              scope.miniScreen = true;
              $timeout(function() {
                setNavHeight();
              },1500);
            }

            //On window resize
            $(window).resize(function() {

              //Get new width/height
              var nh = $(window).height(), nw = $(window).width();

              //When height is changed, navigator is fixed or small
              if ((mainHeader.css('display')==='none'||
                  playlistNav.hasClass('fixed')||
                  backendNav.hasClass('fixed')
                  )&&nh!==h) {
                
                setNavHeight();

              }

              //When width is changed and small
              if(w!==nw&&mainHeader.css('display')==='none'&&!minified) {
                minified = true;
                scope.miniScreen = true;
                setNavHeight();
              //When width is changed and big
              } else if (w!==nw&&minified&&mainHeader.css('display')!=='none') {
                minified = false;
                scope.miniScreen = false;
                playlistNav.css({ height: '' });
                backendNav.css({ height: '' });
              }

              h = nh;
              w = nw;

            });

            $('.bmm-player-target').scroll(function() {

              //If not minified
              if (mainHeader.css('display')!=='none') {

                if ((!playlistNav.hasClass('fixed')||!backendNav.hasClass('fixed'))&&
                    target.scrollTop()>=mainHeader.height()&&
                    playlistNav.height()<bmmView.height()) {

                  playlistNav.addClass('fixed');
                  backendNav.addClass('fixed');
                  setNavHeight();

                } else if ((playlistNav.hasClass('fixed')||backendNav.hasClass('fixed'))&&
                    target.scrollTop()<mainHeader.height()) {

                  playlistNav.removeClass('fixed').css({ height: '' });
                  backendNav.removeClass('fixed').css({ height: '' });

                }

              }

            });

            var setNavHeight = function() {
              //Calculate new height
              playlistNav.css({
                height: target.height()
              });

              //Calculate new height
              backendNav.css({
                height: target.height()
              });
            };
            
          }
        };
      }
    };
  }]);