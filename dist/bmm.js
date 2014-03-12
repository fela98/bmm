"use strict";angular.module("bmmLibApp",[]),angular.module("bmmLibApp").directive("bmmPlayerController",["$timeout","bmmUser","bmmPlayer",function(a,b,c){return{template:'<div bmm-video-container></div><div class="bmm-max-width"><div bmm-player-about title=""></div><div class="bmm-player-buttons"><div class="bmm-player-clock" id="clock1">{{clock1 | bmmTime}}</div><div bmm-player-mediaslider></div><div class="bmm-player-clock" id="clock2">{{clock2 | bmmTime}}</div><div bmm-player-maincontrollers></div><div class="bmm-player-tools"><div bmm-track-tools></div><div bmm-volume-controller></div></div></div><div class="bmm-copyright">{{copyright}}</div></div>',compile:function(){return{pre:function(d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v="",w=!1;d.copyright=f.copyright,e.addClass("bmm-player-controller"),d.clock1="00:00",d.clock2="00:00",a(function(){l=e.find(".bmm-player-buttons"),m=e.find(".bmm-player-repeat"),n=l.children(".bmm-player-mediaslider"),o=e.find(".bmm-player-shuffle"),p=e.find(".bmm-player-maincontrollers"),q=e.find(".bmm-player-tools"),r=e.find(".bmm-player-about"),s=e.find(".bmm-volume-controller"),t=e.find(".bmm-player-video"),u=e.find(".bmm-video-container"),k=e.parent().find(".bmm-player-target"),e.find(".bmm-player-clock").each(function(a){0===a?i=$(this):j=$(this)}),h=r.outerWidth(),z(),a(function(){x()}),a(function(){d.bmmPlayer=c,d.$watch("bmmPlayer.getCurrentTimePercent",function(a){n.children(".ui-slider-handle").hasClass("ui-state-active")||n.slider("value",a),d.clock1=c.getCurrentTime,d.clock2=c.getDuration()-c.getCurrentTime,z()}),n.slider({slide:function(a,b){c.setCurrentTime(b.value)}})}),t.click(function(){var a=0;"topTools"===v&&(a=e.parent().find(".bmm-player-tools").height()),"true"===u.attr("active")?(u.attr("active","false"),"w"!==u.attr("direction")?(k.animate({height:e.parent().height()-a-(e.height()-b.getScreenHeight())},"fast"),u.animate({height:0},"fast",function(){e.find(".bmm-video-screen").hide(),$(window).trigger("resize")})):(k.animate({width:e.parent().width()-e.parent().find(".bmm-player-tools").width()},"fast"),u.animate({width:0},"fast",function(){e.parent().find(".bmm-video-screen").hide(),$(window).trigger("resize")}))):(u.attr("active","true"),e.parent().find(".bmm-video-screen").show(),"w"!==u.attr("direction")?(e.parent().find(".bmm-video-screen").css({width:(b.getScreenHeight()-10)/(9/16),height:b.getScreenHeight()-10,top:10}),k.animate({height:e.parent().height()-e.height()-b.getScreenHeight()-a},"fast"),u.animate({height:b.getScreenHeight()},"fast",function(){$(window).trigger("resize")})):(e.parent().find(".bmm-video-screen").css({width:b.getScreenWidth(),height:b.getScreenWidth()/(16/9),top:u.height()/2-b.getScreenWidth()/(16/9)/2}),k.animate({width:e.parent().width()-e.parent().find(".bmm-player-tools").width()-b.getScreenWidth()+1},"fast"),u.animate({width:b.getScreenWidth()},"fast",function(){$(window).trigger("resize")})))})}),$(window).resize(function(){z(),a(function(){x()})});var x=function(){""===v||"normalTools"===v?k.css({height:e.parent().outerHeight()-e.outerHeight()}):"topTools"===v&&k.css({height:e.parent().outerHeight()-e.outerHeight()})},y=function(){g=i.width()+j.width(),g=l.width()-(g+g/1.8),n.width(g).attr("length",g)},z=function(){l.width()<1.8*h&&!w?(w=!0,A("minified")):l.width()>=2.8*h&&w?(w=!1,A(),y()):l.width()>=1.8*h&&!w&&y(),e.width()<450&&"topTools"!==v?A("topTools"):"normalTools"!==v&&e.width()>=450&&A("normalTools")},A=function(a){switch("undefined"!=typeof a&&"minified"!==a&&(v=a),a){case"minified":var b;r.addClass("bmm-minified"),r.css({padding:".5em 0 0 .8em",height:"","float":"none"}),r.after('<div class="bmm-player-minitimer"></div>'),b=e.find(".bmm-player-minitimer"),i.remove().appendTo(b),b.append("<div>&nbsp/&nbsp</div>"),j.remove().appendTo(b),b.children().css("float","left"),b.css({position:"absolute",top:".5em",right:".8em"}),l.css("padding",".5em"),n.css({width:"","float":"none"});break;case"topTools":s.attr({length:"4em",orientation:"horizontal"}),e.css("paddingTop",""),p.insertAfter(n),q.detach().insertAfter(u).css({width:"100%"});break;case"normalTools":e.css("paddingTop",""),s.attr({length:"5em",orientation:"horizontal"}),e.find(".bmm-player-minitimer").length>0?p.insertAfter(n):p.insertAfter(j),e.find(".bmm-player-tools").detach().insertAfter(p).css({width:"",background:""}).children().css("float","");break;default:i.detach().insertBefore(n).css("float",""),j.detach().insertAfter(n).css("float",""),e.find(".bmm-player-minitimer").remove(),l.css("padding",""),n.css("float",""),r.removeClass("bmm-minified"),r.css({padding:"","float":""}),p.detach().insertAfter(j)}}}}}}}]),angular.module("bmmLibApp").directive("bmmPlayerAbout",[function(){return{template:'<div class="bmm-player-thumbnail"></div><div class="bmm-player-title"></div><div class="bmm-player-subtitle"></div><div class="bmm-player-extra"></div>',link:function(a,b,c){b.addClass("bmm-player-about");var d=function(){"undefined"!=typeof c.thumbnail&&b.find(".bmm-player-thumbnail").css({background:'url("'+c.thumbnail+'")'}),b.find(".bmm-player-title").append(c.title),b.find(".bmm-player-subtitle").append(c.subtitle),b.find(".bmm-player-extra").append(c.extra),b.css({overflow:"hidden"}),e(),$(window).resize(function(){e()}),a.$watch("bmmPlayer.getTitle",function(a){b.find(".bmm-player-title").html(a)}),a.$watch("bmmPlayer.getSubtitle",function(a){b.find(".bmm-player-subtitle").html(a)}),a.$watch("bmmPlayer.getExtra",function(a){b.find(".bmm-player-extra").html(a)})},e=function(){b.hasClass("bmm-minified")?b.height("auto"):b.height(b.find(".bmm-player-thumbnail").outerHeight())};d()}}}]),angular.module("bmmLibApp").directive("bmmPlayerMaincontrollers",[function(){return{template:"<div bmm-player-repeat></div><div bmm-player-previous></div><div bmm-player-play></div><div bmm-player-next></div><div bmm-player-shuffle></div>",link:function(a,b){b.addClass("bmm-player-maincontrollers")}}}]),angular.module("bmmLibApp").directive("bmmPlayerMediaslider",["$timeout",function(a){return{template:'<div class="bmm-player-mediaslider-behind"></div>',compile:function(){return{pre:function(b,c){c.addClass("bmm-player-mediaslider");var d=c.find(".bmm-player-mediaslider-behind"),e="";d.css({position:"absolute",bottom:"0"});var f=function(){b.$watch(function(){return c.attr("orientation")},function(){a(function(){g()})})},g=function(){"undefined"!=typeof c.attr("length")&&(e=c.attr("length")),"undefined"!=typeof c.attr("orientation")&&"vertical"===c.attr("orientation")?(c.find(".ui-slider-handle").css({left:""}),c.css({width:"",height:e}),d.css({width:"100%",height:"0"}),c.slider({orientation:"vertical",slide:function(a,b){d.css({height:b.value+"%"})},change:function(a,b){d.css({height:b.value+"%"})}})):(c.css({width:e,height:""}),d.css({width:"0",height:"100%"}),c.slider({orientation:"horizontal",slide:function(a,b){d.css({width:b.value+"%"})},change:function(a,b){d.css({width:b.value+"%"})}}))};f()}}}}}]),angular.module("bmmLibApp").directive("bmmPlayerPlay",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-play"),b.$watch("bmmPlayer.getPlaying",function(a){a?c.addClass("active"):c.removeClass("active")}),c.click(function(){c.hasClass("active")?a.setPause():a.setPlay()}),$(window).unbind("keyup"),$(window).bind("keyup",function(b){32===b.keyCode&&(console.log("so far"),c.hasClass("active")?a.setPause():(console.log("so good"),a.setPlay()))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerPrevious",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-previous").click(function(){a.setPrevious()})}}}]),angular.module("bmmLibApp").directive("bmmPlayerNext",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-next").click(function(){a.setNext()})}}}]),angular.module("bmmLibApp").directive("bmmPlayerRepeat",["bmmPlaylist",function(a){return{link:function(b,c){c.addClass("bmm-player-repeat"),c.click(function(){c.hasClass("active")?(a.setRepeat(!1),c.removeClass("active")):(a.setRepeat(!0),c.addClass("active"))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerShuffle",["bmmPlaylist",function(a){return{link:function(b,c){c.addClass("bmm-player-shuffle"),c.click(function(){c.hasClass("active")?(a.setShuffle(!1),c.removeClass("active")):(a.setShuffle(!0),c.addClass("active"))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerVideo",[function(){return{link:function(a,b){b.addClass("bmm-player-video")}}}]),angular.module("bmmLibApp").directive("bmmTrackFavorite",[function(){return{link:function(a,b){b.addClass("bmm-track-favorite")}}}]),angular.module("bmmLibApp").directive("bmmTrackTimer",[function(){return{link:function(a,b){b.addClass("bmm-track-timer")}}}]),angular.module("bmmLibApp").directive("bmmTrackShare",[function(){return{link:function(a,b){b.addClass("bmm-track-share")}}}]),angular.module("bmmLibApp").directive("bmmTrackDownload",[function(){return{link:function(a,b){b.addClass("bmm-track-download")}}}]),angular.module("bmmLibApp").directive("bmmTrackTools",[function(){return{template:"<div bmm-track-favorite></div><div bmm-track-timer></div><div bmm-track-share></div><div bmm-track-download></div><div bmm-player-video></div>",link:function(a,b){b.addClass("bmm-track-tools")}}}]),angular.module("bmmLibApp").directive("bmmVideoContainer",["$timeout","bmmUser",function(a,b){return{template:"<div bmm-video-screen></div>",compile:function(){return{pre:function(c,d){var e;d.addClass("bmm-video-container"),a(function(){e=d.find(".bmm-video-screen"),g(),$(window).resize(function(){g(),f()})});var f=function(){e.css("top",10),e.height(d.height()-10),e.width(d.height()/(9/16))},g=function(){d.resizable({handles:"n",resize:function(a,c){d.css("top",""),d.attr("active","true"),b.setScreenHeight(c.size.height),e.show()}})}}}}}}]),angular.module("bmmLibApp").directive("bmmVideoScreen",["$compile","bmmPlayer",function(a,b){return{template:'<div class="bmm-video-target"></div>',compile:function(){return{pre:function(a,b){b.addClass("bmm-video-screen")},post:function(c,d){b.initialize(".bmm-video-target"),d.find(".bmm-video-target").append(a("<div bmm-video-fullscreen></div><div bmm-player-fullscreen></div>")(c))}}}}}]),angular.module("bmmLibApp").directive("bmmVideoFullscreen",["bmmPlayer","$timeout",function(a,b){return{template:'<div class="bmm-video-fullscreen-buttons"><div bmm-player-previous></div><div bmm-player-play></div><div bmm-player-next></div><p>{{clock1 | bmmTime}} / {{clock2 | bmmTime}}</p><div bmm-volume-controller></div></div><div class="bmm-video-fullscreen-slider"><div bmm-player-mediaslider></div></div>',compile:function(){return{pre:function(c,d){d.addClass("bmm-video-fullscreen"),d.addClass("hide");var e=b(function(){d.fadeOut("slow")},2e3);$(window).on("mousemove click",function(){d.show(),b.cancel(e),e=b(function(){d.fadeOut("slow")},2e3)});var f;b(function(){b(function(){f=d.find(".bmm-video-fullscreen-slider").find(".bmm-player-mediaslider"),c.bmmPlayer=a,c.$watch("bmmPlayer.getCurrentTimePercent",function(b){f.children(".ui-slider-handle").hasClass("ui-state-active")||f.slider("value",b),c.clock1=a.getCurrentTime,c.clock2=a.getDuration()-a.getCurrentTime}),f.slider({slide:function(b,c){a.setCurrentTime(c.value)}}),c.$watch("bmmPlayer.getFullscreen",function(a){"on"===a?d.removeClass("hide"):d.addClass("hide")})})})}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeController",["$timeout",function(a){return{template:"<div bmm-volume-mute></div><div bmm-volume-slider></div><div bmm-volume-max></div>",compile:function(){return{pre:function(b,c){var d,e=0;c.addClass("bmm-volume-controller"),a(function(){d=c.find(".bmm-volume-slider"),c.children().css("float","left"),f(),$(window).resize(function(){f()})});var f=function(){0===e&&(d.find(".bmm-player-mediaslider").css("width","5em"),c.children().each(function(){e+=$(this).width()}));var a="horizontal";"undefined"!=typeof c.attr("orientation")?a=c.attr("orientation"):c.parent().width()<=e&&(a="vertical"),"vertical"===a?(d.attr("orientation","vertical").css({marginTop:"",marginLeft:".65em"}),c.children().css("float","none")):(d.attr("orientation","horizontal").css({marginTop:".65em",marginLeft:""}),c.children().css("float","left")),"undefined"!=typeof c.attr("length")&&d.attr("length",c.attr("length"))}}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeSlider",["$timeout","bmmPlayer",function(a,b){return{template:'<div bmm-player-mediaslider class="bmm-minified"></div>',compile:function(){return{pre:function(c,d){var e,f="horizontal",g="5em";d.addClass("bmm-volume-slider"),a(function(){e=d.find(".bmm-player-mediaslider"),e.attr("length",g),c.$watch(function(){return d.attr("")},function(){"undefined"!=typeof d.attr("orientation")&&(f=d.attr("orientation")),"undefined"!=typeof d.attr("length")&&(g=d.attr("length")),e.attr("orientation",f),e.attr("length",g),h()}),$(window).resize(function(){"undefined"!=typeof d.attr("orientation")&&d.attr("orientation")!==f&&(f=d.attr("orientation"),c.$apply(function(){e.attr("orientation",f)}),h()),"undefined"!=typeof d.attr("length")&&d.attr("length")!==g&&(g=d.attr("length"),c.$apply(function(){e.attr("length",g)}),h())})});var h=function(){a(function(){a(function(){var a=d.find(".bmm-player-mediaslider");c.bmmPlayer=b,c.$watch("bmmPlayer.getVolume",function(b){a.children(".ui-slider-handle").hasClass("ui-state-active")||a.slider("value",100*b)}),a.slider({slide:function(a,c){b.setVolume(c.value/100)}})})})}}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeMute",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-volume-mute").click(function(){a.setMute()})}}}]),angular.module("bmmLibApp").directive("bmmVolumeMax",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-volume-max"),c.click(function(){a.setMute(!1),a.setVolume(1)})}}}]),angular.module("bmmLibApp").directive("bmmResize",[function(){return{link:function(a,b){b.resizable()}}}]),angular.module("bmmLibApp").directive("bmmContainerMain",["$timeout",function(a){return{compile:function(){return{pre:function(b,c){c.addClass("bmm-container-main"),$(c).bind("scroll",function(){$(this).scrollTop()+$(this).innerHeight()>=$(this)[0].scrollHeight&&$(".bmm-view").trigger("scrollBottom")}),$(c.find(".bmm-view")).bind("scroll",function(){$(this).scrollTop()+$(this).innerHeight()>=$(this)[0].scrollHeight&&$(".bmm-view").trigger("scrollBottom")}),$(window).width()<=500&&a(function(){a(function(){$(window).trigger("resize")})});var d=!1;$(window).resize(function(){$(window).width()<=500&&!d?(d=!0,b.miniScreen=!0):d&&$(window).width()>500&&(d=!1,b.miniScreen=!1)}),$(".bmm-player-target").scroll(function(){!$(".bmm-navigator-switch").hasClass("fixed")&&$(".bmm-player-target").scrollTop()>=$(".bmm-container-header").height()?$(".bmm-navigator-switch").addClass("fixed"):$(".bmm-navigator-switch").hasClass("fixed")&&$(".bmm-player-target").scrollTop()<$(".bmm-container-header").height()&&$(".bmm-navigator-switch").removeClass("fixed")})}}}}}]),angular.module("bmmLibApp").factory("bmmUser",[function(){var a={},b={},c="main",d=!0;return b.screen={},b.screen.height="180",b.screen.width="180",a.getScreenWidth=function(){return b.screen.width},a.getScreenHeight=function(){return b.screen.height},a.getCurrentNavigator=function(){return c},a.setScreenWidth=function(a){b.screen.width=a},a.setScreenHeight=function(a){b.screen.height=a},a.setCurrentNavigator=function(a){c=a},a.displayNavigator=function(a){return"undefined"!=typeof a&&(d=a),d},a}]),angular.module("bmmLibApp").factory("bmmPlaylist",["bmmShuffle",function(){var a={},b=!1,c=!1,d=!1,e=[],f=[];return a.setTracks=function(c){return"undefined"==typeof c.tracks?!1:($.isArray(c.tracks)||(c.tracks=[c.tracks]),e=c.tracks,a.index="undefined"!=typeof c.index&&(c.index>=0||c.index<e.length)?c.index:0,b="undefined"!=typeof c.url?c.url:!1,void 0)},a.setShuffle=function(a){return c="undefined"!=typeof a?a:!c,f=[],$.each(e,function(a){f.push(a)}),c},a.setRepeat=function(a){return d="undefined"!=typeof a?a:!d},a.getUrl=function(){return b},a.getDuration=function(){if("undefined"!=typeof e){var a=0;return $.each(e,function(){a+=this.duration}),a}return!1},a.getCurrent=function(){return e.length?e[a.index]:!1},a.getNext=function(){if(c){if(0===f.length&&d)a.setShuffle(!0);else if(0===f.length&&!d)return!1;var b=Math.floor(Math.random()*f.length);return a.index=f[b],f.splice(b,1),a.getCurrent()}return a.index<e.length-1?(a.index++,a.getCurrent()):d?(a.index=0,a.getCurrent()):!1},a.getPrevious=function(){if(c){if(0===f.length&&d)a.setShuffle(!0);else if(0===f.length&&!d)return!1;var b=Math.floor(Math.random()*f.length);return a.index=f[b],f.splice(b,1),a.getCurrent()}return a.index>0?(a.index--,a.getCurrent()):d?(a.index=e.length-1,a.getCurrent()):!1},a.index=0,a}]),angular.module("bmmLibApp").factory("bmmPlayer",["bmmPlaylist","$timeout","$rootScope",function(a,b,c){var d,e,f={};return f.initialize=function(b){"undefined"!=typeof b&&(d=b),"undefined"!=typeof d&&$(d).jPlayer({ready:function(b){f.setSource(a.getCurrent()),f.getVolume=b.jPlayer.options.volume},swfPath:"bower_components/jplayer/jquery.jplayer/Jplayer.swf",supplied:"m4v, mp3",seeking:function(){},seeked:function(){},canplay:function(){},timeupdate:function(){c.safeApply(function(){f.getCurrentTime=$(d).data("jPlayer").status.currentTime,f.getCurrentTimePercent=$(d).data("jPlayer").status.currentPercentAbsolute})},ended:function(){f.setNext(!0)},resize:function(){c.$apply(function(){f.getFullscreen="off"===f.getFullscreen?"on":"off"})},size:{width:"100%",height:"100%"}})},f.setPlay=function(){$(d).jPlayer("play"),f.getPlaying=!0},f.setPause=function(){$(d).jPlayer("pause"),f.getPlaying=!1},f.setStop=function(){$(d).jPlayer("stop"),f.getPlaying=!1},f.setNext=function(b){var c=a.getNext();c!==!1&&(f.setSource(c),"undefined"!=typeof b&&b&&f.setPlay())},f.setPrevious=function(){var b=a.getPrevious();b!==!1&&f.setSource(b)},f.setMute=function(a){"undefined"!=typeof a?a?$(d).jPlayer("mute"):$(d).jPlayer("unmute"):$(d).data("jPlayer").options.muted?$(d).jPlayer("unmute"):$(d).jPlayer("mute")},f.setFullscreen=function(a){return"undefined"!=typeof a?$(d).jPlayer({fullScreen:a}):a="off"===f.getFullscreen?!0:!1,$(d).jPlayer({fullScreen:a}),a},f.setVolume=function(a){$(d).jPlayer("volume",a),f.getVolume=a},f.setSource=function(a){var b=$(d).data("jPlayer").status.paused;e=a,f.getTitle=a.title,f.getSubtitle=a.subtitle,f.getExtra=a.extra,e.video?$(d).jPlayer("setMedia",{m4v:e.url,poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"}):$(d).jPlayer("setMedia",{mp3:e.url,poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"}),b||f.setPlay(),f.getTrackCount++},f.setCurrentTime=function(a){$(d).jPlayer("playHead",a)},f.getDuration=function(){return $(d).data("jPlayer").status.duration},f.getCurrentTime=0,f.getCurrentTimePercent=0,f.getVolume=0,f.getTitle="",f.getSubtitle="",f.getExtra="",f.getFullscreen="off",f.getPlaying=!1,f.getTrackCount=0,c.safeApply=function(a){var b=this.$root.$$phase;"$apply"===b||"$digest"===b?a&&"function"==typeof a&&a():this.$apply(a)},f}]),angular.module("bmmLibApp").factory("bmmApi",[function(){var a={},b="localhost/";return a.serverUrl=function(a){b=a},a.getserverUrli=function(){return b},a.root=function(){return $.ajax({method:"GET",crossDomain:!0,url:b,dataType:"json"}).fail(function(a){console.log(a)})},a.album=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"album",data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.albumLatest=function(a,c){return"undefined"==typeof a&&(a={}),"undefined"==typeof c&&(c=""),$.ajax({method:"GET",url:b+"album",headers:{"Accept-Language":c},data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.albumGet=function(a,c,d){return"undefined"==typeof d&&(d={}),"undefined"==typeof c&&(c=""),$.ajax({method:"GET",url:b+"album/"+a,headers:{"Accept-Language":c},data:$.param(d),dataType:"json"}).fail(function(a){console.log(a)})},a.albumPut=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"PUT",url:b+"album/"+a,data:$.param(c),dataType:"json"}).fail(function(a){console.log(a)})},a.albumDelete=function(a){return $.ajax({method:"DELETE",url:b+"album/"+a,dataType:"json"}).fail(function(a){console.log(a)})},a.facetsPublishedYears=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"GET",url:b+"facets/published/years",data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.loginAuthentication=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"login/authentication",data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.loginRedirect=function(){window.location=b+"login/redirect?redirect_to="+window.location},a.search=function(a,c,d){return"undefined"==typeof c&&(c={}),"undefined"==typeof d&&(d=""),$.ajax({method:"GET",url:b+"search/"+a,headers:{"Accept-Language":d},data:$.param(c),dataType:"json"}).fail(function(a){console.log(a)})},a.suggest=function(a,c){return"undefined"==typeof c&&(c=""),$.ajax({method:"GET",url:b+"suggest/"+a,headers:{"Accept-Language":c},dataType:"json"}).fail(function(a){console.log(a)})},a.track=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"track",data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.trackLatest=function(a,c){return"undefined"==typeof a&&(a={}),"undefined"==typeof c&&(c=""),$.ajax({method:"GET",url:b+"track",headers:{"Accept-Language":c},data:$.param(a),dataType:"json"}).fail(function(a){console.log(a)})},a.trackRel=function(a,c,d){return"undefined"==typeof c&&(c={}),"undefined"==typeof d&&(d=""),$.ajax({method:"GET",url:b+"track/rel/"+a,headers:{"Accept-Language":d},data:$.param(c),dataType:"json"}).fail(function(a){console.log(a)})},a.trackGet=function(a,c,d){return"undefined"==typeof c&&(c={}),"undefined"==typeof d&&(d=""),$.ajax({method:"GET",url:b+"track/"+a,headers:{"Accept-Language":d},data:$.param(c),dataType:"json"}).fail(function(a){console.log(a)})},a.trackPut=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"PUT",url:b+"track/"+a,data:$.param(c),dataType:"json"}).fail(function(a){console.log(a)})},a.trackDelete=function(a){return $.ajax({method:"DELETE",url:b+"track/"+a,dataType:"json"}).fail(function(a){console.log(a)})},a.trackFiles=function(a,c,d){return $.ajax({method:"POST",url:b+"track/"+a+"/files",file:d,dataType:"json",data:$.param({type:c})}).fail(function(a){console.log(a)})},a.user=function(){return $.ajax({method:"GET",url:b+"user",dataType:"json"}).fail(function(a){console.log(a)})},a.userTrackCollectionPost=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"user/track_collection",data:$.param(a),dataType:"json"}).fail(function(){})},a.userTrackCollectionLink=function(a,c,d){return"undefined"==typeof c&&(c={}),$.ajax({method:"LINK",url:b+"user/track_collection/"+a,beforeSend:function(a){$.each(c,function(){a.setRequestHeader("Link","<"+b+"track/"+this+">")}),a.setRequestHeader("Accept-Language",d)},dataType:"json"}).fail(function(){})},a.userTrackCollectionGet=function(a){return $.ajax({method:"GET",url:b+"user/track_collection/"+a,dataType:"json"}).fail(function(a){console.log(a)})},a.userTrackCollectionPut=function(a,c){return"undefined"==typeof c&&(c={}),c.type="track_collection",$.ajax({method:"PUT",url:b+"user/track_collection/"+a,data:$.param(c),dataType:"json"}).fail(function(){})},a.userTrackCollectionDelete=function(a){return $.ajax({method:"DELETE",url:b+"user/track_collection/"+a,dataType:"json"}).fail(function(){})},a}]),angular.module("bmmLibApp").factory("bmmShuffle",[function(){var a=function(a){for(var b,c,d=a.length;0!==d;)b=Math.floor(Math.random()*d),d-=1,c=a[d],a[d]=a[b],a[b]=c;return a};return a}]),angular.module("bmmLibApp").directive("bmmPlaylist",["$rootScope","bmmApi",function(a,b){return{link:function(c,d){c.sortableOptions={update:function(){c.$apply("playlist")},handle:".sort",axis:"y"},d.addClass("bmm-playlist"),$(".bmm-playlist").on("dragdrop",function(){e()}),c.$watch("playlist",function(){e()}),d.click(function(){d.toggleClass("active")});var e=function(){d.find("tbody").find("tr").each(function(){$(this).draggable({handle:".drag",helper:"clone",appendTo:".bmm-main-container",revert:"invalid",scope:"move",containment:".bmm-main-container",scroll:!0})}),$("body").find(".bmm-playlist-private").droppable({scope:"move",activeClass:"active",hoverClass:"hover",tolerance:"pointer",drop:function(c,d){b.userTrackCollectionLink($(this).attr("id"),[d.draggable.attr("id")],d.draggable.attr("language")).fail(function(){a.$apply()})}})}}}}]),angular.module("bmmLibApp").directive("bmmPath",["$location","$compile",function(a,b){return{compile:function(){return{pre:function(c,d){function e(a){return a=a.replace(":",""),a.substr(0,1).toUpperCase()+a.substr(1)}d.addClass("bmm-path");var f,g=a.path().split("/"),h="";$.each(g,function(a){f=e(this),h+=this+"/",a===g.length-1&&1!==a?d.append('<div class="bmm-pointer"> > </div>'+f):a===g.length-1?d.append(f):1===a?d.append('<a ng-href="#'+h+'">'+f+"</a>"):a>1&&d.append('<div class="bmm-pointer"> > </div><a ng-href="#'+h+'">'+f+"</a>")}),b(d.contents())(c)}}}}}]),angular.module("bmmLibApp").factory("bmmIndex",[function(){var a={};return a.prev=function(a,b,c,d){return"undefined"==typeof d&&(d=0),a>=c+d?a-c:b-(c-a)},a.next=function(a,b,c){return b>=a+c?a+c:a+c-b},a}]),angular.module("bmmLibApp").directive("bmmSliderImage",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-image"),c.append('<div class="bmm-slider-image-prev"></div>'),c.append('<div class="bmm-slider-image-next"></div>');var d=c.find(".bmm-slider-image-prev"),e=c.find(".bmm-slider-image-next"),f=0;d.click(function(){f>0&&(f--,g(!0))}),e.click(function(){c.find("li").length-1>f&&(f++,g(!0))}),a(function(){g(),c.height(c.find("li").width()/2.8),d.css({top:c.height()/2-d.height()/2}),e.css({top:c.height()/2-e.height()/2})}),$(window).resize(function(){g(),c.height(c.find("li").width()/2.8),d.css({top:c.height()/2-d.height()/2}),e.css({top:c.height()/2-e.height()/2})});var g=function(a){c.find("li").each(function(b){"undefined"!=typeof a&&a?$(this).animate({left:$(this).width()*b-$(this).width()*f},"fast"):$(this).css({left:$(this).width()*b-$(this).width()*f})})}}}}]),angular.module("bmmLibApp").directive("bmmSliderList",["$timeout",function(a){return{link:function(b,c){var d;c.children().length?d():a(function(){d()},1e3),d=function(){c.addClass("bmm-slider-list"),c.find("> div:first-child").addClass("active"),c.append('<div class="bullets"></div>'),c.children().each(function(){$(this).hasClass("bullets")||c.find(".bullets").append("<div></div>")}),c.find(".bullets div:first-child").addClass("active"),c.find(".bullets").children().each(function(){$(this).click(function(){c.children().removeClass("active"),c.find(".bullets").children().removeClass("active"),c.find("> div:nth-child("+($(this).index()+1)+")").addClass("active"),c.find(".bullets > div:nth-child("+($(this).index()+1)+")").addClass("active")})}),c.parent().width()<500?c.width("100%"):c.width(""),$(window).resize(function(){c.parent().width()<500?c.width("100%"):c.width("")})}}}}]),angular.module("bmmLibApp").directive("bmmSliderAlbum",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-album"),c.append('<div class="bmm-slider-album-prev"></div>'),c.append('<div class="bmm-slider-album-next"></div>');var d,e=c.find(".bmm-slider-album-prev"),f=c.find(".bmm-slider-album-next"),g=0;e.click(function(){g>0&&(g--,h(!0))}),f.click(function(){c.find("li").length>4*g+4&&(g++,h(!0))}),a(function(){h(),e.css({top:c.height()/2-e.height()/2}),f.css({top:c.height()/2-f.height()/2})}),$(window).resize(function(){h(),e.css({top:c.height()/2-e.height()/2}),f.css({top:c.height()/2-f.height()/2})});var h=function(a){var b=.23*c.find("ul").width(),e=b;d=.08*c.find("ul").width()/5,c.height(e+.1*b),c.find("li").css({width:b,height:e}),c.find("li").each(function(b){0===$(this).find(".shadow").length&&$(this).append('<div class="shadow"></div>'),"undefined"!=typeof a&&a?$(this).animate({left:($(this).width()+d)*b-4*($(this).width()+d)*g+d},"fast"):$(this).css({left:($(this).width()+d)*b-4*($(this).width()+d)*g+d})})}}}}]),angular.module("bmmLibApp").directive("bmmSliderVideo",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-video"),c.append('<div class="bmm-slider-video-prev"></div>'),c.append('<div class="bmm-slider-video-next"></div>'),c.append('<div class="bmm-video-shadow"></div>');var d,e=c.find(".bmm-videos"),f=c.find(".bmm-slider-video-prev"),g=c.find(".bmm-slider-video-next"),h=function(){e.children().length?(d=e.find(">:nth-child(1)"),e.children().each(function(){$(this).zIndex(0)}),e.children().length>2&&e.children().last().zIndex(2).addClass("left"),d.zIndex(3).addClass("middle"),e.children().length>1&&d.next().zIndex(2).addClass("right")):a(function(){h()},500)};h(),f.click(function(){var a,b,c;e.children().each(function(){$(this).zIndex()<=1&&$(this).zIndex(0)}),e.children().length>=3?(d.is(":last-child")?(a=e.find("> div:first-child"),b=a.next(),c=d.prev()):d.next().is(":last-child")?(a=d.next(),b=e.find("> div:first-child"),c=d.prev()):d.is(":first-child")?(a=d.next(),b=a.next(),c=e.find("> div:last-child")):(a=d.next(),b=a.next(),c=d.prev()),c.zIndex(1),d.zIndex(2),a.zIndex(4),b.zIndex(2),c.removeClass("left"),d.removeClass("middle"),a.removeClass("right"),d.addClass("left"),a.addClass("middle"),b.addClass("right"),d=a):d.is(":last-child")||(d.zIndex(2).removeClass("middle").addClass("left"),d.next().zIndex(3).removeClass("right").addClass("middle"),d=d.next())}),g.click(function(){var a,b,c;e.children().each(function(){$(this).zIndex()<=1&&$(this).zIndex(0)}),e.children().length>=3?(d.is(":first-child")?(a=e.find("> div:last-child"),b=a.prev(),c=d.next()):d.prev().is(":first-child")?(a=d.prev(),b=e.find("> div:last-child"),c=d.next()):d.is(":last-child")?(a=d.prev(),b=a.prev(),c=e.find("> div:first-child")):(a=d.prev(),b=a.prev(),c=d.next()),c.zIndex(1),d.zIndex(2),a.zIndex(3),b.zIndex(2),c.removeClass("right"),d.removeClass("middle"),a.removeClass("left"),d.addClass("right"),a.addClass("middle"),b.addClass("left"),d=a):d.is(":first-child")||(d.zIndex(2).removeClass("middle").addClass("right"),d.prev().zIndex(3).removeClass("left").addClass("middle"),d=d.prev())}),a(function(){c.height(c.width()/2.8),f.css({top:c.height()/2-f.height()/1.3}),g.css({top:c.height()/2-g.height()/1.3})}),$(window).resize(function(){c.height(c.width()/2.8),f.css({top:c.height()/2-f.height()/1.3}),g.css({top:c.height()/2-g.height()/1.3})})}}}]),angular.module("bmmLibApp").factory("bmmTranslation",[function(){var a={};return a.getTranslation=function(a){return $.ajax(a+".json").fail(function(a){console.log(a)})},a}]),angular.module("bmmLibApp").factory("bmmRelation",[function(){var a={};return a.filter=function(a,b){if("undefined"==typeof b||""===b||b===[])return!1;var c=[],d=[];return $.each(a,function(){d=this,$.isArray(b)?$.each(b,function(){d.type===this&&c.push(d)}):d.type===b&&c.push(d)}),c},a}]),angular.module("bmmLibApp").filter("bmmTime",function(){return function(a){var b=function(a){var b=0,c=0;for("undefined"==typeof a&&(a=0),a=parseInt(a,10);a>=60;)a>=3600?(b+=1,a-=3600):(c+=1,a-=60);return 9>=b&&(b="0"+b),9>=c&&(c="0"+c),9>=a&&(a="0"+a),"00"===b?b="":b+=":",c+=":",b&&c&&0===a&&(a=""),b+c+a};return b(a)}}),angular.module("bmmLibApp").filter("bmmBibleVerse",["bmmTranslator",function(a){return function(b){var c=" ";if("undefined"!=typeof b){var d={};$.each(a.get(),function(b){var c=a.get()[b];c=c.toLowerCase(),c=c.replace(/\s/g,""),c=c.substring(0,3),d[b]=c}),b=b.toLowerCase(),b=b.replace(/\s+/g," "),b=b.replace(/\./g,""),b=b.split(","),$.each(b,function(){var b,e,f,g,h="";switch(g=this,g=g.toLowerCase()," "===g.substring(0,1)&&(g=g.replace(" ","")),g.substring(0,1).match(/^\d+$/)&&" "===g.substring(1,2)&&(g=g.replace(" ","")),g=g.split(" "),"undefined"==typeof g[0]&&(g[0]=""),"undefined"==typeof g[1]&&(g[1]=""),b=g[0],b=b.substring(0,3),e=g[1].split("-"),f=e[1],e=e[0],b){case d.bibleGenesisShort:b=a.get().bibleGenesis;
break;case d.bibleExodusShort:b=a.get().bibleExodus;break;case d.bibleLeviticusShort:b=a.get().bibleLeviticus;break;case d.bibleNumbersShort:b=a.get().bibleNumbers;break;case d.bibleDeuteronomyShort:b=a.get().bibleDeuteronomy;break;case d.bibleJoshuaShort:b=a.get().bibleJoshua;break;case d.bibleJudgesShort:b=a.get().bibleJudges;break;case d.bibleRuthShort:b=a.get().bibleRuth;break;case d.bibleFirstSamuelShort:b=a.get().bibleFirstSamuel;break;case d.bibleSecondSamuelShort:b=a.get().bibleSecondSamuel;break;case d.bibleFirstKingsShort:b=a.get().bibleFirstKings;break;case d.bibleSecondKingsShort:b=a.get().bibleSecondKings;break;case d.bibleFirstChroniclesShort:b=a.get().bibleFirstChronicles;break;case d.bibleSecondChroniclesShort:b=a.get().bibleSecondChronicles;break;case d.bibleEzraShort:b=a.get().bibleEzra;break;case d.bibleNehemiahShort:b=a.get().bibleNehemiah;break;case d.bibleTobitShort:b=a.get().bibleTobit;break;case d.bibleJudithShort:b=a.get().bibleJudith;break;case d.bibleEstherShort:b=a.get().bibleEsther;break;case d.bibleFirstMaccabeesShort:b=a.get().bibleFirstMaccabees;break;case d.bibleSecondMaccabeesShort:b=a.get().bibleSecondMaccabees;break;case d.bibleJobShort:b=a.get().bibleJob;break;case d.biblePsalmsShort:b=a.get().biblePsalms;break;case d.bibleProverbsShort:b=a.get().bibleProverbs;break;case d.bibleEcclesiastesShort:b=a.get().bibleEcclesiastes;break;case d.bibleSongOfSongsShort:b=a.get().bibleSongOfSongs;break;case d.bibleWisdomShort:b=a.get().bibleWisdom;break;case d.bibleSirachShort:b=a.get().bibleSirach;break;case d.bibleIsaiahShort:b=a.get().bibleIsaiah;break;case d.bibleJeremiahShort:b=a.get().bibleJeremiah;break;case d.bibleLamentationsShort:b=a.get().bibleLamentations;break;case d.bibleBaruchShort:b=a.get().bibleBaruch;break;case d.bibleEzekielShort:b=a.get().bibleEzekiel;break;case d.bibleDanielShort:b=a.get().bibleDaniel;break;case d.bibleHoseaShort:b=a.get().bibleHosea;break;case d.bibleJoelShort:b=a.get().bibleJoel;break;case d.bibleAmosShort:b=a.get().bibleAmos;break;case d.bibleObadiahShort:b=a.get().bibleObadiah;break;case d.bibleJonahShort:b=a.get().bibleJonah;break;case d.bibleMicahShort:b=a.get().bibleMicah;break;case d.bibleNahumShort:b=a.get().bibleNahum;break;case d.bibleHabakkukShort:b=a.get().bibleHabakkuk;break;case d.bibleZephaniahShort:b=a.get().bibleZephaniah;break;case d.bibleHaggaiShort:b=a.get().bibleHaggai;break;case d.bibleZechariahShort:b=a.get().bibleZechariah;break;case d.bibleMalachiShort:b=a.get().bibleMalachi;break;case d.bibleMatthewShort:b=a.get().bibleMatthew;break;case d.bibleMarkShort:b=a.get().bibleMark;break;case d.bibleLukeShort:b=a.get().bibleLuke;break;case d.bibleJohnShort:b=a.get().bibleJohn;break;case d.bibleActsOfTheApostlesShort:b=a.get().bibleActsOfTheApostles;break;case d.bibleRomansShort:b=a.get().bibleRomans;break;case d.bibleFirstCorinthiansShort:b=a.get().bibleFirstCorinthians;break;case d.bibleSecondCorinthiansShort:b=a.get().bibleSecondCorinthians;break;case d.bibleGalatiansShort:b=a.get().bibleGalatians;break;case d.bibleEphesiansShort:b=a.get().bibleEphesians;break;case d.biblePhilippiansShort:b=a.get().biblePhilippians;break;case d.bibleColossiansShort:b=a.get().bibleColossians;break;case d.bibleFirstThessaloniansShort:b=a.get().bibleFirstThessalonians;break;case d.bibleSecondThessaloniansShort:b=a.get().bibleSecondThessalonians;break;case d.bibleFirstTimothyShort:b=a.get().bibleFirstTimothy;break;case d.bibleSecondTimothyShort:b=a.get().bibleSecondTimothy;break;case d.bibleTitusShort:b=a.get().bibleTitus;break;case d.biblePhilemonShort:b=a.get().biblePhilemon;break;case d.bibleHebrewsShort:b=a.get().bibleHebrews;break;case d.bibleJamesShort:b=a.get().bibleJames;break;case d.bibleFirstPeterShort:b=a.get().bibleFirstPeter;break;case d.bibleSecondPeterShort:b=a.get().bibleSecondPeter;break;case d.bibleFirstJohnShort:b=a.get().bibleFirstJohn;break;case d.bibleSecondJohnShort:b=a.get().bibleSecondJohn;break;case d.bibleThirdJohnShort:b=a.get().bibleThirdJohn;break;case d.bibleJudeShort:b=a.get().bibleJude;break;case d.bibleRevelationShort:b=a.get().bibleRevelation;break;default:b=!1}(1>e||e>999||!(e+"").match(/^\d+$/))&&(e=!1),(1>f||f>999||!(f+"").match(/^\d+$/))&&(f=!1),b!==!1&&(h+=b,e!==!1&&(h+=" "+e,f!==!1&&Number(f)>Number(e)&&(h+="-"+f))),h+=", ",", "!==h&&(c+=h)})}return c}}]),angular.module("bmmLibApp").factory("bmmTranslator",function(){var a={},b={};return a.get=function(){return b},a.set=function(a){b=a},a}),angular.module("bmmLibApp").directive("bmmPlayerFullscreen",["bmmPlayer","$timeout",function(a,b){return{link:function(c,d){d.addClass("bmm-player-fullscreen"),d.click(function(){var b=a.setFullscreen();b?d.addClass("active"):d.removeClass("active")});var e=b(function(){d.fadeOut("slow")},2e3);$(window).on("mousemove click",function(){d.show(),b.cancel(e),e=b(function(){d.fadeOut("slow")},2e3)})}}}]),angular.module("bmmLibApp").filter("bmmMin",function(){return function(a,b){return"undefined"==typeof b&&(b=15),a.length>b&&(a=a.substring(0,b)+"..."),a}}),angular.module("bmmLibApp").filter("bmmLanguage",function(){return function(a){var b={nb:"Norsk",af:"Afrikaans",bg:"Български език",cs:"Čeština",de:"Deutsch",en:"English",es:"Español",fi:"Suomi",fr:"Français",hr:"Hrvatski",hu:"Magyar",it:"Italiano",nl:"Nederlands",pl:"Polski",pt:"Português",ro:"Română",ru:"Русский язык",tr:"Türkçe",zh:"中文",zxx:"Unknown"};return"undefined"!=typeof b[a]?b[a]:a}});