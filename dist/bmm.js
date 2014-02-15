"use strict";angular.module("bmmLibApp",[]),angular.module("bmmLibApp").directive("bmmPlayerController",["$timeout","bmmUser","bmmPlayer",function(a,b,c){return{template:'<div bmm-video-container></div><div class="bmm-max-width"><div bmm-player-about title=""></div><div class="bmm-player-buttons"><div bmm-player-repeat></div><div bmm-player-clock id="clock1">00:00</div><div bmm-player-mediaslider></div><div bmm-player-clock id="clock2">00:00</div><div bmm-player-shuffle></div><div bmm-player-maincontrollers></div><div class="bmm-player-tools"><div bmm-track-tools></div><div bmm-volume-controller></div><div bmm-player-video></div></div></div></div>',compile:function(){return{pre:function(d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="",v=!0,w=!1;e.addClass("bmm-player-controller"),a(function(){k=e.find(".bmm-player-buttons"),l=e.find(".bmm-player-repeat"),m=k.children(".bmm-player-mediaslider"),n=e.find(".bmm-player-shuffle"),o=e.find(".bmm-player-maincontrollers"),p=e.find(".bmm-player-tools"),q=e.find(".bmm-player-about"),r=e.find(".bmm-volume-controller"),s=e.find(".bmm-player-video"),t=e.find(".bmm-video-container"),j=e.parent().find(".bmm-player-target"),e.find(".bmm-player-clock").each(function(a){0===a?h=$(this):i=$(this)}),g=q.outerWidth(),A(),a(function(){y(),x()}),a(function(){d.bmmPlayer=c,d.$watch("bmmPlayer.getCurrentTimePercent",function(a){m.children(".ui-slider-handle").hasClass("ui-state-active")||m.slider("value",a),e.find("#clock1").attr("time",c.getCurrentTime),e.find("#clock2").attr("time",c.getDuration()-c.getCurrentTime),A()}),m.slider({slide:function(a,b){c.setCurrentTime(b.value)}})}),s.click(function(){var a=0;"topTools"===u&&(a=e.parent().find(".bmm-player-tools").height()),"true"===t.attr("active")?(t.attr("active","false"),"w"!==t.attr("direction")?(j.animate({height:e.parent().height()-a-(e.height()-b.getScreenHeight())},"fast"),t.animate({height:0},"fast",function(){e.find(".bmm-video-screen").hide(),$(window).trigger("resize")})):(j.animate({width:e.parent().width()-e.parent().find(".bmm-player-tools").width()},"fast"),t.animate({width:0},"fast",function(){e.parent().find(".bmm-video-screen").hide(),$(window).trigger("resize")}))):(t.attr("active","true"),e.parent().find(".bmm-video-screen").show(),"w"!==t.attr("direction")?(e.parent().find(".bmm-video-screen").css({width:(b.getScreenHeight()-10)/(9/16),height:b.getScreenHeight()-10,top:10}),j.animate({height:e.parent().height()-e.height()-b.getScreenHeight()-a},"fast"),t.animate({height:b.getScreenHeight()},"fast",function(){$(window).trigger("resize")})):(e.parent().find(".bmm-video-screen").css({width:b.getScreenWidth(),height:b.getScreenWidth()/(16/9),top:t.height()/2-b.getScreenWidth()/(16/9)/2}),j.animate({width:e.parent().width()-e.parent().find(".bmm-player-tools").width()-b.getScreenWidth()+1},"fast"),t.animate({width:b.getScreenWidth()},"fast",function(){$(window).trigger("resize")})))})}),$(window).resize(function(){A(),x(),a(function(){y()})});var x=function(){"sideTools"===u&&v?(v=!1,t.css({position:"absolute",right:e.parent().find(".bmm-player-tools").width()-1,height:j.height()+1,top:-t.height(),width:0}).attr({direction:"w"}),"true"===t.attr("active")&&t.css("width",b.getScreenWidth())):v||"normalTools"!==u&&"topTools"!==u?"sideTools"===u&&t.css({top:-t.height()+2,height:j.height()+4}):(v=!0,t.css({position:"",right:"",height:0,top:"",width:""}).attr({direction:"n"}),"true"===t.attr("active")&&t.css("height",b.getScreenHeight()))},y=function(){""===u||"normalTools"===u?j.css({position:"absolute",top:"0",width:"100%",height:e.parent().outerHeight()-e.outerHeight()+1}):"topTools"===u?j.css({position:"absolute",top:p.outerHeight(),width:"100%",height:e.parent().outerHeight()-e.outerHeight()-p.outerHeight()+1}):"sideTools"===u&&j.css({position:"absolute",top:"0",width:e.parent().outerWidth()-p.outerWidth(),height:e.parent().outerHeight()-e.outerHeight()+1})},z=function(){f=l.width()+h.width()+i.width()+n.width(),f=k.width()-(f+f/1.8),m.width(f).attr("length",f)},A=function(){k.width()<1.8*g&&!w?(w=!0,B("minified")):k.width()>=2.8*g&&w?(w=!1,B(),z()):k.width()>=1.8*g&&!w&&z(),e.width()<450&&"topTools"!==u?B("topTools"):e.parent().height()<350&&"sideTools"!==u&&e.width()>=450&&w===!0?B("sideTools"):("normalTools"!==u&&e.width()>=450&&e.parent().height()>=350||w===!1&&"sideTools"===u)&&B("normalTools")},B=function(a){switch("undefined"!=typeof a&&"minified"!==a&&(u=a),a){case"minified":var b;q.addClass("bmm-minified"),q.css({padding:".5em 0 0 .8em",height:"","float":"none"}),q.after('<div class="bmm-player-minitimer"></div>'),b=e.find(".bmm-player-minitimer"),l.detach().appendTo(b),h.remove().appendTo(b),b.append("<div>&nbsp/&nbsp</div>"),i.remove().appendTo(b),n.detach().appendTo(b),b.children().css("float","left"),b.css({position:"absolute",top:".5em",right:".8em"}),k.css("padding",".5em"),m.css({width:"","float":"none"});break;case"topTools":r.attr({length:"4em",orientation:"horizontal"}),e.css("paddingTop",""),o.insertAfter(m),s.detach().insertAfter(o).css("float","right"),p.detach().prependTo(e.parent()).css({position:"absolute",top:"0",left:"0",right:"",width:"100%",height:"",background:"#1c1c1c"});break;case"normalTools":e.css("paddingTop",""),r.attr({length:"5em",orientation:"horizontal"}),e.find(".bmm-player-minitimer").length>0?o.insertAfter(m):o.insertAfter(n),e.parent().find(".bmm-player-tools").detach().insertAfter(o).css({position:"",top:"",left:"",right:"",width:"",height:"",background:""}).children().css("float",""),s.detach().appendTo(p).css("float","");break;case"sideTools":e.css("paddingTop",".3em"),r.attr({length:"2.5em",orientation:"vertical"}),p.detach().prependTo(e.parent()).css({position:"absolute",top:"0",left:"",right:"0",width:"2em",background:"#1c1c1c",height:"100%"}).children().css("float","left"),o.insertAfter(t),s.detach().insertBefore(o).css({height:"1.8em","float":"left"});break;default:l.detach().insertBefore(m).css("float",""),h.detach().insertBefore(m).css("float",""),n.detach().insertAfter(m).css("float",""),i.detach().insertAfter(m).css("float",""),e.find(".bmm-player-minitimer").remove(),k.css("padding",""),m.css("float",""),q.removeClass("bmm-minified"),q.css({padding:"","float":""}),o.detach().insertAfter(n)}}}}}}}]),angular.module("bmmLibApp").directive("bmmPlayerAbout",[function(){return{template:'<div class="bmm-player-thumbnail"></div><div class="bmm-player-title"></div><div class="bmm-player-subtitle"></div><div class="bmm-player-extra"></div>',link:function(a,b,c){b.addClass("bmm-player-about");var d=function(){"undefined"!=typeof c.thumbnail&&b.find(".bmm-player-thumbnail").css({background:'url("'+c.thumbnail+'")'}),b.find(".bmm-player-title").append(c.title),b.find(".bmm-player-subtitle").append(c.subtitle),b.find(".bmm-player-extra").append(c.extra),b.css({overflow:"hidden"}),e(),$(window).resize(function(){e()}),a.$watch("bmmPlayer.getTitle",function(a){b.find(".bmm-player-title").html(a)}),a.$watch("bmmPlayer.getSubtitle",function(a){b.find(".bmm-player-subtitle").html(a)}),a.$watch("bmmPlayer.getExtra",function(a){b.find(".bmm-player-extra").html(a)})},e=function(){b.hasClass("bmm-minified")?b.height("auto"):b.height(b.find(".bmm-player-thumbnail").outerHeight())};d()}}}]),angular.module("bmmLibApp").directive("bmmPlayerMaincontrollers",[function(){return{template:"<div bmm-player-previous></div><div bmm-player-play></div><div bmm-player-next></div>",link:function(a,b){b.addClass("bmm-player-maincontrollers")}}}]),angular.module("bmmLibApp").directive("bmmPlayerMediaslider",["$timeout",function(a){return{template:'<div class="bmm-player-mediaslider-behind"></div>',compile:function(){return{pre:function(b,c){c.addClass("bmm-player-mediaslider");var d=c.find(".bmm-player-mediaslider-behind"),e="";d.css({position:"absolute",bottom:"0"});var f=function(){b.$watch(function(){return c.attr("orientation")},function(){a(function(){g()})})},g=function(){"undefined"!=typeof c.attr("length")&&(e=c.attr("length")),"undefined"!=typeof c.attr("orientation")&&"vertical"===c.attr("orientation")?(c.find(".ui-slider-handle").css({left:""}),c.css({width:"",height:e}),d.css({width:"100%",height:"0"}),c.slider({orientation:"vertical",slide:function(a,b){d.css({height:b.value+"%"})},change:function(a,b){d.css({height:b.value+"%"})}})):(c.css({width:e,height:""}),d.css({width:"0",height:"100%"}),c.slider({orientation:"horizontal",slide:function(a,b){d.css({width:b.value+"%"})},change:function(a,b){d.css({width:b.value+"%"})}}))};f()}}}}}]),angular.module("bmmLibApp").directive("bmmPlayerPlay",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-play"),c.click(function(){c.hasClass("active")?(a.setPause(),c.removeClass("active")):(a.setPlay(),c.addClass("active"))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerPrevious",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-previous").click(function(){a.setPrevious()})}}}]),angular.module("bmmLibApp").directive("bmmPlayerNext",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-player-next").click(function(){a.setNext()})}}}]),angular.module("bmmLibApp").directive("bmmPlayerRepeat",["bmmPlaylist",function(a){return{link:function(b,c){c.addClass("bmm-player-repeat"),c.click(function(){c.hasClass("active")?(a.setRepeat(!1),c.removeClass("active")):(a.setRepeat(!0),c.addClass("active"))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerShuffle",["bmmPlaylist",function(a){return{link:function(b,c){c.addClass("bmm-player-shuffle"),c.click(function(){c.hasClass("active")?(a.setShuffle(!1),c.removeClass("active")):(a.setShuffle(!0),c.addClass("active"))})}}}]),angular.module("bmmLibApp").directive("bmmPlayerClock",[function(){return{link:function(a,b){b.addClass("bmm-player-clock"),a.$watch(function(){return b.attr("time")},function(a){b.html(c(a))});var c=function(a){var b=0,c=0;for("undefined"==typeof a&&(a=0),a=parseInt(a,10);a>=60;)a>=3600?(b+=1,a-=3600):(c+=1,a-=60);return 9>=b&&(b="0"+b),9>=c&&(c="0"+c),9>=a&&(a="0"+a),"00"===b?b="":b+=":",c+=":",b&&c&&0===a&&(a=""),b+c+a}}}}]),angular.module("bmmLibApp").directive("bmmPlayerVideo",[function(){return{link:function(a,b){b.addClass("bmm-player-video"),b.click(function(){b.toggleClass("active")})}}}]),angular.module("bmmLibApp").directive("bmmTrackFavorite",[function(){return{link:function(a,b){b.addClass("bmm-track-favorite")}}}]),angular.module("bmmLibApp").directive("bmmTrackTimer",[function(){return{link:function(a,b){b.addClass("bmm-track-timer")}}}]),angular.module("bmmLibApp").directive("bmmTrackShare",[function(){return{link:function(a,b){b.addClass("bmm-track-share")}}}]),angular.module("bmmLibApp").directive("bmmTrackDownload",[function(){return{link:function(a,b){b.addClass("bmm-track-download")}}}]),angular.module("bmmLibApp").directive("bmmTrackTools",[function(){return{template:"<div bmm-track-favorite></div><div bmm-track-timer></div><div bmm-track-share></div><div bmm-track-download></div>",link:function(a,b){b.addClass("bmm-track-tools")}}}]),angular.module("bmmLibApp").directive("bmmVideoContainer",["$timeout","bmmUser",function(a,b){return{template:"<div bmm-video-screen></div>",compile:function(){return{pre:function(c,d){var e,f;d.addClass("bmm-video-container"),a(function(){e=d.find(".bmm-video-screen"),h(),$(window).resize(function(){h(),g()})});var g=function(){"undefined"!=typeof d.attr("direction")&&"w"===d.attr("direction")?(e.width(d.width()),e.height(d.width()/(16/9)),e.css({top:d.height()/2-e.height()/2})):(e.css("top",10),e.height(d.height()-10),e.width(d.height()/(9/16)))},h=function(){if("undefined"!=typeof d.attr("direction")){if(f!==d.attr("direction"))switch(f=d.attr("direction"),d.resizable("destroy"),f){case"n":d.resizable({handles:f,resize:function(a,c){d.css("top",""),d.attr("active","true"),b.setScreenHeight(c.size.height),e.show()}});break;case"w":d.resizable({handles:f,resize:function(a,c){d.css("left",""),d.attr("active","true"),b.setScreenWidth(c.size.width),e.show()}});break;default:d.resizable({handles:f})}}else"undefined"==typeof f&&(f="n",d.resizable({handles:f,resize:function(a,c){d.css("top",""),d.attr("active","true"),b.setScreenHeight(c.size.height),e.show()}}))}}}}}}]),angular.module("bmmLibApp").directive("bmmVideoScreen",["bmmPlayer",function(a){return{template:'<div class="bmm-video-target"><div bmm-video-fullscreen></div></div>',compile:function(){return{pre:function(b,c){c.addClass("bmm-video-screen"),c.click(function(){a.setFullscreen()})},post:function(){a.initialize(".bmm-video-target")}}}}}]),angular.module("bmmLibApp").directive("bmmVideoFullscreen",[function(){return{compile:function(){return{pre:function(a,b){b.addClass("bmm-video-fullscreen")}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeController",["$timeout",function(a){return{template:"<div bmm-volume-mute></div><div bmm-volume-slider></div><div bmm-volume-max></div>",compile:function(){return{pre:function(b,c){var d,e=0;c.addClass("bmm-volume-controller"),a(function(){d=c.find(".bmm-volume-slider"),c.children().css("float","left"),f(),$(window).resize(function(){f()})});var f=function(){0===e&&(d.find(".bmm-player-mediaslider").css("width","5em"),c.children().each(function(){e+=$(this).width()}));var a="horizontal";"undefined"!=typeof c.attr("orientation")?a=c.attr("orientation"):c.parent().width()<=e&&(a="vertical"),"vertical"===a?(d.attr("orientation","vertical").css({marginTop:"",marginLeft:".65em"}),c.children().css("float","none")):(d.attr("orientation","horizontal").css({marginTop:".65em",marginLeft:""}),c.children().css("float","left")),"undefined"!=typeof c.attr("length")&&d.attr("length",c.attr("length"))}}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeSlider",["$timeout","bmmPlayer",function(a,b){return{template:'<div bmm-player-mediaslider class="bmm-minified"></div>',compile:function(){return{pre:function(c,d){var e,f="horizontal",g="5em";d.addClass("bmm-volume-slider"),a(function(){e=d.find(".bmm-player-mediaslider"),e.attr("length",g),c.$watch(function(){return d.attr("")},function(){"undefined"!=typeof d.attr("orientation")&&(f=d.attr("orientation")),"undefined"!=typeof d.attr("length")&&(g=d.attr("length")),e.attr("orientation",f),e.attr("length",g),h()}),$(window).resize(function(){"undefined"!=typeof d.attr("orientation")&&d.attr("orientation")!==f&&(f=d.attr("orientation"),c.$apply(function(){e.attr("orientation",f)}),h()),"undefined"!=typeof d.attr("length")&&d.attr("length")!==g&&(g=d.attr("length"),c.$apply(function(){e.attr("length",g)}),h())})});var h=function(){a(function(){a(function(){var a=d.find(".bmm-player-mediaslider");c.bmmPlayer=b,c.$watch("bmmPlayer.getVolume",function(b){a.children(".ui-slider-handle").hasClass("ui-state-active")||a.slider("value",100*b)}),a.slider({slide:function(a,c){b.setVolume(c.value/100)}})})})}}}}}}]),angular.module("bmmLibApp").directive("bmmVolumeMute",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-volume-mute").click(function(){a.setMute()})}}}]),angular.module("bmmLibApp").directive("bmmVolumeMax",["bmmPlayer",function(a){return{link:function(b,c){c.addClass("bmm-volume-max"),c.click(function(){a.setMute(!1),a.setVolume(1)})}}}]),angular.module("bmmLibApp").directive("bmmResize",[function(){return{link:function(a,b){b.resizable()}}}]),angular.module("bmmLibApp").directive("bmmContainerMain",[function(){return{compile:function(){return{pre:function(a,b){b.addClass("bmm-container-main")}}}}}]),angular.module("bmmLibApp").factory("bmmUser",[function(){var a={},b={},c="main",d=!0;return b.screen={},b.screen.height="180",b.screen.width="180",a.getScreenWidth=function(){return b.screen.width},a.getScreenHeight=function(){return b.screen.height},a.getCurrentNavigator=function(){return c},a.setScreenWidth=function(a){b.screen.width=a},a.setScreenHeight=function(a){b.screen.height=a},a.setCurrentNavigator=function(a){c=a},a.displayNavigator=function(a){return"undefined"!=typeof a&&(d=a),d},a}]),angular.module("bmmLibApp").directive("bmmContainerHeader",["$timeout",function(a){return{compile:function(){return{pre:function(b,c){var d,e,f,g,h=!1;c.addClass("bmm-container-header"),a(function(){a(function(){a(function(){i()})})}),$(window).resize(function(){i()});var i=function(){f=c.parent().height(),g=c.height(),e=4*g,h||("undefined"==typeof d&&(e>f||c.width()<800)?(c.parent().find(".bmm-navigator-playlist").addClass("minified"),c.css("display","none"),d=!1):"undefined"==typeof d?d=!0:d&&(e>f||c.parent().width()<800)?(c.parent().find(".bmm-navigator-playlist").addClass("minified"),h=!0,c.animate({height:0},"fast",function(){c.css({height:"",display:"none"}),h=!1,i()}),d=!1):!d&&f>=e&&c.parent().width()>=800&&(c.parent().find(".bmm-navigator-playlist").removeClass("minified"),h=!0,c.css({height:0,display:""}).animate({height:g},"fast",function(){h=!1,i()}),d=!0))}}}}}}]),angular.module("bmmLibApp").directive("bmmNavigatorMain",["$timeout","bmmUser",function(a,b){return{compile:function(){return{pre:function(c,d){var e,f,g,h,i,j="undefined",k=!1;d.addClass("bmm-navigator-main"),a(function(){m()}),$(window).resize(function(){m()});var l=function(){h.bind("click",function(){0===d.height()&&0===f.height()?("medium"===j&&b.displayNavigator(!0),"main"===b.getCurrentNavigator()?(g.width(""),d.height("").animate({marginLeft:0},"fast",function(){$(window).trigger("resize")})):(g.width(""),f.height("").animate({marginLeft:0},"fast",function(){$(window).trigger("resize")}))):("medium"===j&&b.displayNavigator(!1),"main"===b.getCurrentNavigator()?d.animate({marginLeft:-d.width()},"fast",function(){d.height(0),g.width("100%"),$(window).trigger("resize")}):f.animate({marginLeft:-f.width()},"fast",function(){f.height(0),g.width("100%"),$(window).trigger("resize")}))}),i.click(function(){0===d.height()?(b.setCurrentNavigator("main"),f.animate({marginLeft:-f.width()},"fast",function(){f.height(0),d.height("").animate({marginLeft:0})})):(b.setCurrentNavigator("playlist"),d.animate({marginLeft:-d.width()},"fast",function(){d.height(0),f.height("").animate({marginLeft:0})}))})},m=function(){f=d.parent().find(".bmm-navigator-playlist"),e=d.parent().width(),g=d.parent().find(".bmm-view"),i=d.parent().find(".bmm-navigator-switch"),h=d.parent().find(".bmm-navigator-toggle"),i.removeClass("load"),h.removeClass("load"),k||(k=!0,l()),600>e?"small"!==j&&(d.parent().css({margin:0,height:"100%"}),h.show(),i.show(),d.addClass("minified"),g.addClass("minified"),"undefined"===j||"main"!==b.getCurrentNavigator()?(d.css({height:0,marginLeft:-f.width()}),"undefined"===j&&g.width("100%")):d.animate({marginLeft:-f.width()},"fast",function(){d.height(0),g.width("100%")}),j="small"):800>e&&"medium"!==j?(g.width(""),d.parent().css({margin:0,height:"100%"}),b.displayNavigator()&&"main"===b.getCurrentNavigator()?"large"===j?(h.show(),i.show(),d.animate({height:0},"fast",function(){d.addClass("minified"),g.addClass("minified"),d.css("marginLeft",-d.width()),f.animate({marginLeft:-f.width()},"fast",function(){f.height(0),d.height("").animate({marginLeft:0})})})):0===d.height()?d.height("").animate({marginLeft:0}):"undefined"===j&&(d.addClass("minified"),g.addClass("minified"),h.show(),i.show()):b.displayNavigator()?"main"===b.getCurrentNavigator()?(d.addClass("minified"),"small"===j&&0!==d.height()?b.displayNavigator(!0):d.css({marginLeft:-d.width(),height:0})):d.animate({height:0},"fast",function(){"large"!==j&&(d.css({marginLeft:-d.width()}),d.addClass("minified"),h.fadeIn(),i.fadeIn(),g.addClass("minified"))}):(h.show(),i.show(),"large"===j&&d.animate({height:0},"fast",function(){d.addClass("minified"),g.addClass("minified"),d.css("marginLeft",-d.width()),f.animate({marginLeft:-f.width()},"fast",function(){f.height(0),g.width("100%")})})),j="medium"):e>=800&&"large"!==j&&(d.parent().css({margin:"",height:""}),g.width(""),"medium"!==j&&"small"!==j||"main"!==b.getCurrentNavigator()?0===f.height()?(h.hide(),i.hide(),d.removeClass("minified"),g.removeClass("minified"),d.css({marginLeft:"",height:""}),f.height("").animate({marginLeft:0},"fast")):(h.hide(),i.hide(),d.removeClass("minified"),g.removeClass("minified"),d.css({marginLeft:"",height:""})):(h.hide(),i.hide(),d.animate({marginLeft:-d.width()},"fast",function(){d.removeClass("minified"),g.removeClass("minified"),d.css({marginLeft:"",height:""}),f.height("").animate({marginLeft:0},"fast",function(){f.css({marginLeft:""})})})),j="large")}}}}}}]),angular.module("bmmLibApp").directive("bmmNavigatorPlaylist",["$timeout","bmmUser",function(a,b){return{compile:function(){return{pre:function(c,d){var e,f,g,h="undefined";d.addClass("bmm-navigator-playlist"),a(function(){i()}),$(window).resize(function(){i()});var i=function(){f=d.parent().find(".bmm-navigator-main"),e=d.parent().width(),g=d.parent().find(".bmm-view"),600>e?"small"!==h&&(b.displayNavigator&&"playlist"===b.getCurrentNavigator()?d.animate({marginLeft:-f.width()},"fast",function(){d.height(0),g.width("100%"),$(window).trigger("resize")}):d.css({height:0,marginLeft:-f.width()}),h="small"):800>e&&"medium"!==h?(b.displayNavigator()||"playlist"!==b.getCurrentNavigator()||"small"!==h||0===d.height()?"playlist"!==b.getCurrentNavigator()&&"undefined"===h?d.css({height:0,marginLeft:-f.width()}):b.displayNavigator()&&"playlist"===b.getCurrentNavigator()&&0===d.height()&&d.height("").animate({marginLeft:0},"fast",function(){$(window).trigger("resize")}):b.displayNavigator(!0),h="medium"):"large"!==h&&e>=800&&(h="large")}}}}}}]),angular.module("bmmLibApp").factory("bmmPlaylist",["bmmShuffle",function(a){var b={},c=0,d="",e=!1,f=!1,g=!1,h=[],i=[],j=[];return b.setTracks=function(b){return"undefined"==typeof b.tracks?!1:($.isArray(b.tracks)||(b.tracks=[b.tracks]),h=b.tracks,j=a(b.tracks.slice(0)),i=f?j:h,c="undefined"!=typeof b.index&&(b.index>=0||b.index<h.length)?b.index:0,d="undefined"!=typeof b.title?b.title:"",e="undefined"!=typeof b.url?b.url:!1,void 0)},b.setTracks({tracks:[{title:"Tittel a",subtitle:"Undertittel a",extra:"Extra a",url:"testmedia/musikk/a.mp3",duration:4321,video:!1},{title:"Tittel b",subtitle:"Undertittel b",extra:"Extra b",url:"testmedia/musikk/b.mp3",duration:2121,video:!1},{title:"Tittel c",subtitle:"Undertittel c",extra:"Extra c",url:"testmedia/musikk/c.mp3",duration:3441,video:!1},{title:"Tittel d",subtitle:"Undertittel d",extra:"Extra d",url:"testmedia/musikk/d.mp3",duration:4321,video:!1},{title:"Tittel e",subtitle:"Undertittel e",extra:"Extra e",url:"testmedia/musikk/e.mp3",duration:2121,video:!1},{title:"Tittel f",subtitle:"Undertittel f",extra:"Extra f",url:"testmedia/musikk/f.mp3",duration:3441,video:!1},{title:"Tittel g",subtitle:"Undertittel g",extra:"Extra g",url:"testmedia/musikk/g.mp3",duration:3441,video:!1},{title:"Tittel va",subtitle:"Undertittel a",extra:"Extra a",url:"testmedia/video/a.mp4",duration:4321,video:!0},{title:"Tittel vb",subtitle:"Undertittel b",extra:"Extra b",url:"testmedia/video/b.mp4",duration:2121,video:!0},{title:"Tittel vc",subtitle:"Undertittel c",extra:"Extra c",url:"testmedia/video/c.mp4",duration:3441,video:!0},{title:"Tittel vd",subtitle:"Undertittel d",extra:"Extra d",url:"testmedia/video/d.mp4",duration:4321,video:!0},{title:"Tittel ve",subtitle:"Undertittel e",extra:"Extra e",url:"testmedia/video/e.mp4",duration:2121,video:!0}],index:2,title:"Test tittel",url:"path/to/playlist"}),b.setShuffle=function(a){return f="undefined"!=typeof a?a:!f,i=f?j:h,f},b.setRepeat=function(a){return g="undefined"!=typeof a?a:!g},b.getUrl=function(){return e},b.getTitle=function(){return d},b.getDuration=function(){if("undefined"!=typeof h){var a=0;return $.each(h,function(){a+=this.duration}),a}return!1},b.getCurrent=function(){return h.length?i[c]:!1},b.getNext=function(){return c<h.length-1?(c++,b.getCurrent()):g?(c=0,b.getCurrent()):!1},b.getPrevious=function(){return c>0?(c--,b.getCurrent()):g?(c=h.length-1,b.getCurrent()):!1},b}]),angular.module("bmmLibApp").factory("bmmPlayer",["bmmPlaylist","$timeout","$rootScope",function(a,b,c){var d,e,f={};return f.initialize=function(b){"undefined"!=typeof b&&(d=b),"undefined"!=typeof d&&$(d).jPlayer({ready:function(b){f.setSource(a.getCurrent()),f.getVolume=b.jPlayer.options.volume},swfPath:"bower_components/jplayer/jquery.jplayer/Jplayer.swf",supplied:"m4v, mp3",seeking:function(){},seeked:function(){},canplay:function(){},timeupdate:function(){c.$apply(function(){f.getCurrentTime=$(d).data("jPlayer").status.currentTime,f.getCurrentTimePercent=$(d).data("jPlayer").status.currentPercentAbsolute})},ended:function(){f.setNext(),f.setPlay()},resize:function(){},size:{width:"100%",height:"100%"}})},f.setPlay=function(){$(d).jPlayer("play")},f.setPause=function(){$(d).jPlayer("pause")},f.setStop=function(){$(d).jPlayer("stop")},f.setNext=function(){var b=a.getNext();b!==!1&&f.setSource(b)},f.setPrevious=function(){var b=a.getPrevious();b!==!1&&f.setSource(b)},f.setMute=function(a){"undefined"!=typeof a?a?$(d).jPlayer("mute"):$(d).jPlayer("unmute"):$(d).data("jPlayer").options.muted?$(d).jPlayer("unmute"):$(d).jPlayer("mute")},f.setFullscreen=function(a){"undefined"!=typeof a?$(d).jPlayer({fullScreen:a}):$(d).jPlayer({fullScreen:!0})},f.setVolume=function(a){$(d).jPlayer("volume",a),f.getVolume=a},f.setSource=function(a){var b=$(d).data("jPlayer").status.paused;e=a,f.getTitle=a.title,f.getSubtitle=a.subtitle,f.getExtra=a.extra,e.video?$(d).jPlayer("setMedia",{m4v:e.url,poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"}):$(d).jPlayer("setMedia",{mp3:e.url,poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"}),b||f.setPlay()},f.setCurrentTime=function(a){$(d).jPlayer("playHead",a)},f.getDuration=function(){return $(d).data("jPlayer").status.duration},f.getCurrentTime=0,f.getCurrentTimePercent=0,f.getVolume=0,f.getTitle="",f.getSubtitle="",f.getExtra="",f}]),angular.module("bmmLibApp").factory("bmmApi",[function(){var a={},b="localhost";return a.serverUrl=function(a){b=a},a.root=function(){return $.ajax({method:"GET",crossDomain:!0,url:b}).fail(function(a){console.log(a)})},a.album=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"album",data:$.param(a)}).fail(function(a){console.log(a)})},a.albumLatest=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"GET",url:b+"album/latest",data:$.param(a)}).fail(function(a){console.log(a)})},a.albumGet=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"GET",url:b+"album/"+a,data:$.param(c)}).fail(function(a){console.log(a)})},a.albumPut=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"PUT",url:b+"album/"+a,data:$.param(c)}).fail(function(a){console.log(a)})},a.albumDelete=function(a){return $.ajax({method:"DELETE",url:b+"album/"+a}).fail(function(a){console.log(a)})},a.facetsPublishedYears=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"GET",url:b+"facets/published/years",data:$.param(a)}).fail(function(a){console.log(a)})},a.loginAuthentication=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"login/authentication",data:$.param(a)}).fail(function(a){console.log(a)})},a.loginRedirect=function(){window.location=b+"login/redirect?redirect_to="+window.location},a.search=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"GET",url:b+"search/"+a,data:$.param(c)}).fail(function(a){console.log(a)})},a.suggest=function(a){return $.ajax({method:"GET",url:b+"suggest/"+a}).fail(function(a){console.log(a)})},a.track=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"POST",url:b+"track",data:$.param(a)}).fail(function(a){console.log(a)})},a.trackLatest=function(a){return"undefined"==typeof a&&(a={}),$.ajax({method:"GET",url:b+"track/latest",data:$.param(a)}).fail(function(a){console.log(a)})},a.trackRel=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"GET",url:b+"track/rel/"+a,data:$.param(c)}).fail(function(a){console.log(a)})},a.trackGet=function(a){return $.ajax({method:"GET",url:b+"track/"+a}).fail(function(a){console.log(a)})},a.trackPut=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"PUT",url:b+"track/"+a,data:$.param(c)}).fail(function(a){console.log(a)})},a.trackDelete=function(a){return $.ajax({method:"DELETE",url:b+"track/"+a}).fail(function(a){console.log(a)})},a.trackFiles=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"POST",url:b+"track/"+a+"/files"}).fail(function(a){console.log(a)})},a.user=function(){return $.ajax({method:"GET",url:b+"user"}).fail(function(a){console.log(a)})},a.userTrackCollectionLink=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"LINK",url:b+"user/track_collection/"+a,headers:c}).fail(function(a){console.log(a)})},a.userTrackCollectionGet=function(a){return $.ajax({method:"GET",url:b+"user/track_collection/"+a}).fail(function(a){console.log(a)})},a.userTrackCollectionPut=function(a,c){return"undefined"==typeof c&&(c={}),$.ajax({method:"PUT",url:b+"user/track_collection/"+a}).fail(function(a){console.log(a)})},a.userTrackCollectionDelete=function(a){return $.ajax({method:"PUT",url:b+"user/track_collection/"+a}).fail(function(a){console.log(a)})},a}]),angular.module("bmmLibApp").factory("bmmShuffle",[function(){var a=function(a){for(var b,c,d=a.length;0!==d;)b=Math.floor(Math.random()*d),d-=1,c=a[d],a[d]=a[b],a[b]=c;return a};return a}]),angular.module("bmmLibApp").directive("bmmPlaylist",[function(){return{template:'<table><thead><tr><th></th><th></th><th>Nr.</th><th>Navn</th><th>Varighet</th><th>Innhold</th><th>Språk</th><th></th></tr></thead><tbody ui-sortable="sortableOptions" ng-model="playlist"><tr ng-repeat="track in playlist"    ng-class="{even: $even, odd: $odd}"><td class="drag">=</td><td class="sort">^ᵥ</td><td>{{track.nr}}</td><td>{{track.name}}</td><td>{{track.duration}}</td><td>{{track.content}}</td><td>{{track.language}}</td><td><div bmm-track-tools></div></td></tr></table></tbody>',link:function(a,b,c){a.playlist=c.playlist,a.sortableOptions={update:function(){a.$apply("playlist")},handle:".sort",axis:"y"},a.$watch("playlist",function(){b.find("tbody").find("tr").each(function(){$(this).draggable({handle:".drag",helper:"clone",appendTo:"body",revert:"invalid",scope:"move"})}),$("body").find(".bmm-playlist-private").droppable({scope:"move",activeClass:"active",hoverClass:"hover",tolerance:"pointer"})}),b.addClass("bmm-playlist"),b.click(function(){b.toggleClass("active")})}}}]),angular.module("bmmLibApp").directive("bmmPath",["$location","$compile",function(a,b){return{compile:function(){return{pre:function(c,d){function e(a){return a=a.replace(":",""),a.substr(0,1).toUpperCase()+a.substr(1)}d.addClass("bmm-path");var f,g=a.path().split("/"),h="";$.each(g,function(a){f=e(this),h+=this+"/",a===g.length-1&&1!==a?d.append('<div class="bmm-pointer"> > </div>'+f):a===g.length-1?d.append(f):1===a?d.append('<a ng-href="#'+h+'">'+f+"</a>"):a>1&&d.append('<div class="bmm-pointer"> > </div><a ng-href="#'+h+'">'+f+"</a>")}),b(d.contents())(c)}}}}}]),angular.module("bmmLibApp").factory("bmmIndex",[function(){var a={};return a.prev=function(a,b,c,d){return"undefined"==typeof d&&(d=0),a>=c+d?a-c:b-(c-a)},a.next=function(a,b,c){return b>=a+c?a+c:a+c-b},a}]),angular.module("bmmLibApp").directive("bmmSliderImage",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-image"),c.append('<div class="bmm-slider-image-prev"></div>'),c.append('<div class="bmm-slider-image-next"></div>');var d=c.find(".bmm-slider-image-prev"),e=c.find(".bmm-slider-image-next"),f=0;d.click(function(){f>0&&(f--,g(!0))}),e.click(function(){c.find("li").length-1>f&&(f++,g(!0))}),a(function(){g(),c.height(c.find("li").width()/2.8),d.css({top:c.height()/2-d.height()/2}),e.css({top:c.height()/2-e.height()/2})}),$(window).resize(function(){g(),c.height(c.find("li").width()/2.8),d.css({top:c.height()/2-d.height()/2}),e.css({top:c.height()/2-e.height()/2})});var g=function(a){c.find("li").each(function(b){"undefined"!=typeof a&&a?$(this).animate({left:$(this).width()*b-$(this).width()*f},"fast"):$(this).css({left:$(this).width()*b-$(this).width()*f})
})}}}}]),angular.module("bmmLibApp").directive("bmmSliderList",[function(){return{link:function(a,b){b.addClass("bmm-slider-list"),b.find("> div:first-child").addClass("active"),b.append('<div class="bullets"></div>'),b.children().each(function(){$(this).hasClass("bullets")||b.find(".bullets").append("<div></div>")}),b.find(".bullets div:first-child").addClass("active"),b.find(".bullets").children().each(function(){$(this).click(function(){b.children().removeClass("active"),b.find(".bullets").children().removeClass("active"),b.find("> div:nth-child("+($(this).index()+1)+")").addClass("active"),b.find(".bullets > div:nth-child("+($(this).index()+1)+")").addClass("active")})}),b.parent().width()<500?b.width("100%"):b.width(""),$(window).resize(function(){b.parent().width()<500?b.width("100%"):b.width("")})}}}]),angular.module("bmmLibApp").directive("bmmSliderAlbum",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-album"),c.append('<div class="bmm-slider-album-prev"></div>'),c.append('<div class="bmm-slider-album-next"></div>');var d,e=c.find(".bmm-slider-album-prev"),f=c.find(".bmm-slider-album-next"),g=0;e.click(function(){g>0&&(g--,h(!0))}),f.click(function(){c.find("li").length>4*g+4&&(g++,h(!0))}),a(function(){h(),c.height(c.find("li").width()),e.css({top:c.height()/2-e.height()/2}),f.css({top:c.height()/2-f.height()/2})}),$(window).resize(function(){h(),c.height(c.find("li").width()),e.css({top:c.height()/2-e.height()/2}),f.css({top:c.height()/2-f.height()/2})});var h=function(a){d=(c.find("ul").width()-4*c.find("li").width())/2.5,c.find("li").each(function(b){"undefined"!=typeof a&&a?$(this).animate({left:($(this).width()+d)*b-4*($(this).width()+d)*g+d},"fast"):$(this).css({left:($(this).width()+d)*b-4*($(this).width()+d)*g+d})})}}}}]),angular.module("bmmLibApp").directive("bmmSliderVideo",["$timeout",function(a){return{link:function(b,c){c.addClass("bmm-slider-video"),c.append('<div class="bmm-slider-video-prev"></div>'),c.append('<div class="bmm-slider-video-next"></div>'),c.append('<div class="bmm-video-shadow"></div>');var d,e=c.find(".bmm-videos"),f=c.find(".bmm-slider-video-prev"),g=c.find(".bmm-slider-video-next"),h=function(){e.children().length?(d=e.find(">:nth-child(1)"),e.children().each(function(){$(this).zIndex(0)}),e.children().length>2&&e.children().last().zIndex(2).addClass("left"),d.zIndex(3).addClass("middle"),e.children().length>1&&d.next().zIndex(2).addClass("right")):a(function(){h()},500)};h(),f.click(function(){var a,b,c;e.children().each(function(){$(this).zIndex()<=1&&$(this).zIndex(0)}),e.children().length>=3?(d.is(":last-child")?(a=e.find("> div:first-child"),b=a.next(),c=d.prev()):d.next().is(":last-child")?(a=d.next(),b=e.find("> div:first-child"),c=d.prev()):d.is(":first-child")?(a=d.next(),b=a.next(),c=e.find("> div:last-child")):(a=d.next(),b=a.next(),c=d.prev()),c.zIndex(1),d.zIndex(2),a.zIndex(4),b.zIndex(2),c.removeClass("left"),d.removeClass("middle"),a.removeClass("right"),d.addClass("left"),a.addClass("middle"),b.addClass("right"),d=a):d.is(":last-child")||(d.zIndex(2).removeClass("middle").addClass("left"),d.next().zIndex(3).removeClass("right").addClass("middle"),d=d.next())}),g.click(function(){var a,b,c;e.children().each(function(){$(this).zIndex()<=1&&$(this).zIndex(0)}),e.children().length>=3?(d.is(":first-child")?(a=e.find("> div:last-child"),b=a.prev(),c=d.next()):d.prev().is(":first-child")?(a=d.prev(),b=e.find("> div:last-child"),c=d.next()):d.is(":last-child")?(a=d.prev(),b=a.prev(),c=e.find("> div:first-child")):(a=d.prev(),b=a.prev(),c=d.next()),c.zIndex(1),d.zIndex(2),a.zIndex(3),b.zIndex(2),c.removeClass("right"),d.removeClass("middle"),a.removeClass("left"),d.addClass("right"),a.addClass("middle"),b.addClass("left"),d=a):d.is(":first-child")||(d.zIndex(2).removeClass("middle").addClass("right"),d.prev().zIndex(3).removeClass("left").addClass("middle"),d=d.prev())}),a(function(){c.height(c.width()/2.8),f.css({top:c.height()/2-f.height()/1.3}),g.css({top:c.height()/2-g.height()/1.3})}),$(window).resize(function(){c.height(c.width()/2.8),f.css({top:c.height()/2-f.height()/1.3}),g.css({top:c.height()/2-g.height()/1.3})})}}}]),angular.module("bmmLibApp").factory("bmmTranslation",[function(){var a={};return a.getTranslation=function(a){return $.ajax(a+".json").fail(function(a){console.log(a)})},a}]),angular.module("bmmLibApp").factory("bmmRelation",[function(){var a={};return a.filter=function(a,b){if("undefined"==typeof b||""===b||b===[])return!1;var c,d=[];return $.each(a,function(){d=this,$.isArray(b)?$.each(b,function(){d.type===this&&c.push(d)}):d.type===b&&c.push(d)}),c},a}]);