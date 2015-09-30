/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();


/*
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
!function(a,b){function c(b){var c,d=a("<div></div>").css({width:"100%"});return b.append(d),c=b.width()-d.width(),d.remove(),c}function d(e,f){var g=e.getBoundingClientRect(),h=g.top,i=g.bottom,j=g.left,k=g.right,l=a.extend({tolerance:0,viewport:b},f),m=!1,n=l.viewport.jquery?l.viewport:a(l.viewport);n.length||(console.warn("isInViewport: The viewport selector you have provided matches no element on page."),console.warn("isInViewport: Defaulting to viewport as window"),n=a(b));var o=n.height(),p=n.width(),q=n.get(0).toString();if(n[0]!==b&&"[object Window]"!==q&&"[object DOMWindow]"!==q){var r=n.get(0).getBoundingClientRect();h-=r.top,i-=r.top,j-=r.left,k-=r.left,d.scrollBarWidth=d.scrollBarWidth||c(n),p-=d.scrollBarWidth}return l.tolerance=~~Math.round(parseFloat(l.tolerance)),l.tolerance<0&&(l.tolerance=o+l.tolerance),0>=k||j>=p?m:m=l.tolerance?!!(h<=l.tolerance&&i>=l.tolerance):!!(i>0&&o>=h)}String.prototype.hasOwnProperty("trim")||(String.prototype.trim=function(){return this.replace(/^\s*(.*?)\s*$/,"$1")});var e=function(b){if(1===arguments.length&&"function"==typeof b&&(b=[b]),!(b instanceof Array))throw new SyntaxError("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions");for(var c=0;c<b.length;c++)if("function"==typeof b[c])for(var d=0;d<this.length;d++)b[c].call(a(this[d]));else console.warn("isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions"),console.warn("isInViewport: Ignoring non-function values in array and moving on");return this};a.fn["do"]=function(a){return console.warn("isInViewport: .do causes issues in IE and some browsers since its a reserved. Use $.fn.run instead i.e., $(el).run(fn)."),e(a)},a.fn.run=e,a.extend(a.expr[":"],{"in-viewport":function(a,b,c){if(c[3]){var e=c[3].split(",");return 1===e.length&&isNaN(e[0])&&(e[1]=e[0],e[0]=void 0),d(a,{tolerance:e[0]?e[0].trim():void 0,viewport:e[1]?e[1].trim():void 0})}return d(a)}})}(jQuery,window);


/*
 * BxSlider v4.1.1 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2013, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"",prevText:"",nextSelector:null,prevSelector:null,autoControls:!1,startText:"",stopText:"",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",B),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&I(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.delegate("a","click",q)},C=function(){o.controls.next=t('<a class="bx-next">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.delegate(".bx-start","click",k),o.controls.autoEl.delegate(".bx-stop","click",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},q=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},I=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),"horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0)}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},B=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider())};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&I(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){t(this).css("zIndex",50),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),I(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",B))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);


/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);



/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 0.4.1 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2014, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
(function($) {
	"use strict";

	if('undefined' === typeof $) {
		if('console' in window){ window.console.info('Too much lightness, Featherlight needs jQuery.'); }
		return;
	}

	/* extend jQuery with standalone featherlight method  $.featherlight(elm, config); */
	var Fl = $.featherlight = function($content, config) {
		if(this.constructor === Fl) {  /* called with new */
			this.id = Fl.id++;
		} /* if $.featherlight() was called only with config or without anything, initialize manually */
		else if('string' !== typeof $content  && false === $content instanceof $){
			config = $.extend({}, Fl.defaults, $content || {});
			$(config.selector, config.context).featherlight();
		} else {
			var fl = new Fl().setup($content, config);
			fl.config.open.call(fl);
			return fl;
		}
	};

	var escapeHandler = function(event) {
		if (27 === event.keyCode && !event.isDefaultPrevented()) { // esc keycode
			var cur = Fl.current();
			if(cur && cur.config.closeOnEsc) {
				cur.$instance.find('.'+cur.config.namespace+'-close:first').click();
				event.preventDefault();
			}
		}
	};

	/* extend featherlight with defaults and methods */
	$.extend(Fl, {
		id: 0,                                    /* Used to id single featherlight instances */
		defaults: {                               /* You can access and override all defaults using $.featherlight.defaults */
			autostart:    true,                   /* Initialize all links with that match "selector" on document ready */
			namespace:    'featherlight',         /* Name of the events and css class prefix */
			selector:     '[data-featherlight]',  /* Elements that trigger the lightbox */
			context:      'body',                 /* Context used to search for the lightbox content and triggers */
			type: {                               /* Manually set type of lightbox. Otherwise, it will check for the targetAttrs value. */
				image: false,
				ajax: false
			},
			targetAttr:   'data-featherlight',    /* Attribute of the triggered element that contains the selector to the lightbox content */
			variant:      null,                   /* Class that will be added to change look of the lightbox */
			resetCss:     false,                  /* Reset all css */
			background:   null,                   /* Custom DOM for the background, wrapper and the closebutton */
			openTrigger:  'click',                /* Event that triggers the lightbox */
			closeTrigger: 'click',                /* Event that triggers the closing of the lightbox */
			openSpeed:    500,                    /* Duration of opening animation */
			closeSpeed:   250,                    /* Duration of closing animation */
			closeOnClick: 'background',           /* Close lightbox on click ('background', 'anywhere' or false) */
			closeOnEsc:   true,                   /* Close lightbox when pressing esc */
			closeIcon:    '',             		/* Close icon */
			beforeOpen:   $.noop,                 /* Called before open. can return false to prevent opening of lightbox. Gets event as parameter, this contains all data */
			beforeClose:  $.noop,                 /* Called before close. can return false to prevent opening of lightbox. Gets event as parameter, this contains all data */
			afterOpen:    $.noop,                 /* Called after open. Gets event as parameter, this contains all data */
			afterClose:   $.noop,                 /* Called after close. Gets event as parameter, this contains all data */
			contentFilters: ['jquery', 'image', 'html', 'ajax'], /* List of content filters to use to determine the content */
			/* opens the lightbox. "this" contains $instance with the lightbox, and with the config */
			open: function(event){
				var goOn = this.config.beforeOpen.call(this, event);
				if(false !== goOn){ /* if before function did not stop propagation */
					goOn = this.open(event);
				}
				if(false !== goOn){
					this.config.afterOpen.call(this, event);
				}
				return goOn;
			},
			/* closes the lightbox. "this" contains $instance with the lightbox, and with the config */
			close: function(event){
				var goOn = this.config.beforeClose.call(this, event);
				if(false !== goOn){ /* if before function did not stop propagation */
					this.close(event);
					this.config.afterClose.call(this, event);
				}
			}
		},
		/* you can access and override all methods using $.featherlight.methods */
		methods: {
			/* setup iterates over a single instance of featherlight and prepares the background and binds the events */
			setup: function(target, config){
				/* all arguments are optional */
				if (typeof target === 'object' && target instanceof $ === false && !config) {
					config = target;
					target = undefined;
				}
				config = $.extend({}, Fl.defaults, config);

				var css = !config.resetCss ? config.namespace : config.namespace+'-reset', /* by adding -reset to the classname, we reset all the default css */
					$background = $(config.background || '<div class="'+css+'"><div class="'+css+'-content"><span class="'+css+'-close-icon '+ config.namespace + '-close">'+config.closeIcon+'</span></div></div>'),
					self = this;
					/* everything that we need later is stored in self (target) */
					$.extend(self, {
						config: config,
						target: target,
						$instance: $background.clone().addClass(config.variant) /* clone DOM for the background, wrapper and the close button */
					});

				/* close when click on background/anywhere/null or closebox */
				self.$instance.on(config.closeTrigger+'.'+config.namespace, function(event) {
					var $target = $(event.target);
					if( ('background' === config.closeOnClick  && $target.is('.'+config.namespace))
						|| 'anywhere' === config.closeOnClick
						|| $target.is('.'+config.namespace+'-close') ){
						event.preventDefault();
						config.close.call(self);
					}
				});

				self.$instance.on('featherlightGetCurrent', function(event){
					if(self.$instance.closest('body').length > 0) {
						event.currentFeatherlight = self;
					}
				});
				return this;
			},

			attach: function($elm, $content, config){
				/* read attributes starting with data-featherlight- */
				var elementConfig = {};
				$.each($elm[0].attributes, function(){
					var match = this.name.match(/^data-featherlight-(.*)/);
					if (match) {
						var val = this.value;
						try { val = $.parseJSON(val); } catch(e) {}
						elementConfig[$.camelCase(match[1])] = val; }
				});

				this.$elm = $elm;
				this.setup($content, $.extend(elementConfig, config));
				$elm.on(this.config.openTrigger+'.'+this.config.namespace, $.proxy(this.config.open, this));
				return this;
			},

			/* this method prepares the content and converts it into a jQuery object */
			getContent: function(){
				var self = this,
					data = self.target || self.$elm.attr(self.config.targetAttr) || '';

				/* Find which filter applies */
				var filter;
				/* check explicit type like {type:{image: true}} */
				for(var filterName in self.config.type) {
					if(self.config.type[filterName] === true) {
						filter = Fl.contentFilters[filterName];
					}
				}
				/* check explicit type like data-featherlight="image" */
				if(!filter && data in Fl.contentFilters) {
					filter = Fl.contentFilters[data];
					data = self.target && self.$elm.attr(self.config.targetAttr);
				}
				data = data || self.$elm.attr('href') || '';
				/* otherwise it's implicit, run checks */
				if(!filter) {
					var target = data;
					data = null;
					$.each(self.config.contentFilters, function() {
						filter = Fl.contentFilters[this];
						if(filter.test)  { data = filter.test(target); }
						if(!data && filter.regex && target.match && target.match(filter.regex)) { data = target; }
						return !data;
					});
					if(!data) {
						if('console' in window){ window.console.error('Featherlight: no content filter found ' + (target ? ' for "' + target + '"' : ' (no target specified)')); }
						return false;
					}
				}
				/* Process it */
				return filter.process.call(self, data);
			},

			/* sets the content of $instance to $content */
			setContent: function($content){
				var self = this;
				/* we need a special class for the iframe */
				if($content.is('iframe') || $('iframe', $content).length > 0){
					self.$instance.addClass(self.config.namespace+'-iframe');
				}
				self.$content = $content.clone().addClass(self.config.namespace+'-inner');

				/* remove existing content */
				self.$instance.find('.'+self.config.namespace+'-inner').remove();
				self.$instance.find('.'+self.config.namespace+'-content').append(self.$content);
			},

			/* opens the lightbox. "this" contains $instance with the lightbox, and with the config */
			open: function(event){
				if(event){
					event.preventDefault();
				}
				var $content = this.getContent();

				/* If we have content, add it and show lightbox */
				if($content){
					if(this.config.closeOnEsc && escapeHandler) {
						$(document).bind('keyup.'+Fl.defaults.namespace, escapeHandler);
						escapeHandler = null;
					}
					this.setContent($content);
					this.$instance.appendTo('body').fadeIn(this.config.openSpeed);
				} else {
					return false;
				}
			},

			/* closes the lightbox. "this" contains $instance with the lightbox, and with the config */
			close: function(event){
				var self = this;
				self.$instance.fadeOut(self.config.closeSpeed,function(){
					self.$instance.detach();
				});
			}
		},
		/* Contains the logic to determine content */
		contentFilters: {
			jquery: {
				regex: /^[#.]\w/,         /* Anything that starts with a class name or identifiers */
				test: function(elem)    { return elem instanceof $ && elem; },
				process: function(elem) { return $(elem); }
			},
			image: {
				regex: /\.(png|jpg|jpeg|gif|tiff|bmp)(\?\S*)?$/i,
				process: function(url)  { return $('<img src="'+url+'" alt="" class="'+this.config.namespace+'-image" />'); }
			},
			html: {
				regex: /^\s*<[\w!][^<]*>/, /* Anything that starts with some kind of valid tag */
				process: function(html) { return $(html); }
			},
			ajax: {
				regex: /./,            /* At this point, any content is assumed to be an URL */
				process: function(url)  {
					var self = this;
					/* we are using load so one can specify a target with: url.html #targetelement */
					var content = $('<div></div>').load(url, function(response, status){
						if ( status !== "error" ) {
							$.featherlight(content.html(), $.extend(self.config, {type: {html: true}}));
						}
					});
				}
			}
		},

		current: function() {
			var event = new $.Event('featherlightGetCurrent');
			$.event.trigger(event);
			return event.currentFeatherlight;
		},

		close: function() {
			var cur = Fl.current();
			if(cur) { cur.config.close.call(cur); }
		}
	});

	Fl.prototype = $.extend(Fl.methods, {constructor: Fl});

	/* extend jQuery with selector featherlight method $(elm).featherlight(config, elm); */
	$.fn.featherlight = function(config, $content) {
		this.each(function(){
			new Fl().attach($(this), $content, config);
		});
		return this;
	};

	/* bind featherlight on ready if config autostart is true */
	$(document).ready(function(){
		var config = Fl.defaults;
		if(config.autostart){
			$(config.selector, config.context).featherlight();
		}
	});
}(jQuery));

/* global alert, jquery, $, document, window, Modernizr, setTimeout, _gaq */
$(document).ready(function () {
	'use strict';

	//Cache some variables
	var mywindow = $(window),
		htmlbody = $('html,body'),
		bottomNavigation = $('.bottom'),
		leftNavigation = $('.left'),
		leftNavToggle = $('.left .drawerbuttonwrapper'),
		bottomNavToggle = $('.bottom .drawerbutton'),
		bothNavigations = $('.navigation'),
		links = $('.navigation').not('.social').find('li[data-story]'),
		mapmarker = $('.map-marker'),
		namecards = $('.namecard'),
		topSlide = $('.titlecard'),
		topVideo = $('#video'),
		topVideo2 = $('#video2'),
		wind = $("#wind")[0],
		topVideoControls = $('#top .drawerbutton'),
		topStory = $('#top').find('.noslide'),
		topSlideScroll = $('#top .scroll'),
		thisLink,
		caption = $('.header'),
		slide = $('.slide').not('#top'),
		noslide = $('.noslide').not(":eq(0)"),
		brpOverlayWrapper = $('#design-plans .brp-overlay'),
		brpOverlay = brpOverlayWrapper.find('img').last(),
		linncoveFlyover = $("#video-flyover .brp-overlay"),
		linncoveFlyoverButton = $("#video-flyover .brp-overlay").find(".drawerbutton"),
		menu 		= $('#mobile-nav'),
		menuHeight	= menu.height(),
		pull 		= menu.find('#pull'),
		thumbnail = $('.thumbnail'),
		media = $('.media'),
		garyjohnsonaudio = $('#gary-johnson-audio'),
		notMobileScreen = Modernizr.mq('only screen and (min-width: 1024px)');

	//Cache some functions

	function activate(element) {
		element.addClass('active');
	}
	function deactivate(element) {
		element.removeClass('active');
	}
	function toggleactive(element) {
		element.toggleClass('active');
	}
	function closeLeftNav() {
		deactivate(leftNavigation);
	}
	function closeBottomNav() {
		deactivate(bottomNavigation);
		bottomNavToggle.removeClass('icon-close').addClass('icon-arrow-down');
	}
	function openBottomNav() {
		activate(bottomNavigation);
		bottomNavToggle.removeClass('icon-arrow-down').addClass('icon-close');
	}
	function openLeftNav() {
		activate(leftNavigation);
	}
	function showVideo() {
		topSlide.animate({"opacity": 1}, 1500).addClass('active');
		wind.volume = 0.1;
		wind.play();
		openBottomNav();
	}
	
	//Go!
	//Go!
	//Go!
	//Go!

	$("img.lazy").lazyload({
		placeholder : "http://res.cloudinary.com/simpleview/image/upload/v1443390946/clients/asheville/1pixel_0aae1cd0-7472-46d1-b137-b66cddba4290.gif",
		skip_invisible : false,
		failure_limit : 1000,
		threshold : 1000,
		effect: "fadeIn",
	});
	$("img.delayed").lazyload({
		placeholder : "http://res.cloudinary.com/simpleview/image/upload/v1443390946/clients/asheville/1pixel_0aae1cd0-7472-46d1-b137-b66cddba4290.gif",
		skip_invisible : false,
		failure_limit : 1000,
		effect: "fadeIn",
		event: "sporty"
	});
	var timeout = setTimeout(function () {
		$("img.delayed").trigger("sporty");
	}, 1);
	
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	if (notMobileScreen) {
		var topVideoFadeIn = setTimeout(showVideo, 0);
		topVideo2.bind('play', function () {
			deactivate(topVideoControls);
			closeBottomNav();
			topSlide.animate({"opacity": 0}, 500);
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Video', 'User Played Trailer']);
		});
		topVideo2.bind('pause', function () {
			activate(topVideoControls);
			openBottomNav();
			topSlide.animate({"opacity": 1}, 500);
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Video', 'User Paused Trailer']);
		});
		topVideo2.bind('ended', function () {
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Video', 'User Finished Trailer']);
			activate(topVideoControls);
			deactivate(topVideo2);
			topVideo2.animate({"opacity": 0}, 1000);
			topVideo.animate({"opacity": 1}, 1000);
			topSlide.animate({"opacity": 1}, 500);
			topVideo[0].play();
		});
		topVideo2.on("click", function (e) {
			if (topVideo2[0].paused && topVideo2.hasClass('active')) {
				topVideo2[0].play();
			} else {
				topVideo2[0].pause();
			}
		});
		topSlide.on("click", function (e) {
			e.preventDefault();
			if (topVideoControls.hasClass('active')) {
				deactivate(topVideoControls);
				topVideo[0].pause();
				topVideo.animate({"opacity": 0.5}, 1000);
				topVideo2.animate({"opacity": 1}, 1000);
				activate(topVideo2);
				topVideo2[0].play();
			} else {
				topVideo2[0].pause();
			}
		});
	}
	garyjohnsonaudio.bind('play', function () {
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Audio', 'User Played Gary Johnson Audio']);
	});
	garyjohnsonaudio.bind('pause', function () {
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Audio', 'User Paused Gary Johnson Audio']);
	});
	garyjohnsonaudio.bind('ended', function () {
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Audio', 'User Finished Gary Johnson Audio']);
	});
	//Setup navs
	//Setup navs
	//Setup navs
	//Setup navs
	//Setup navs
	//Setup navs
	//When the user clicks on the navigation links, get the data-story attribute value of the link and pass that variable to the goToByScroll function
	function goToByScroll(dataslide) {
		htmlbody.animate({ scrollTop: $('[data-story="' + dataslide + '"]').offset().top }, 1000);
	}
	links.on("click", function (e) {
		//e.preventDefault();
		deactivate(namecards);
		var dataslide = $(this).attr('data-story'),
			explorerName = $(this).find('.explorer').text();
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Explorer Clicked', explorerName]);
		goToByScroll(dataslide);
	});
	
	pull.on("click", function(e) {
		e.preventDefault();
		if (menu.hasClass('active')){
			deactivate(menu);
			pull.find('span').removeClass('icon-close').addClass('icon-menu2');
		} else {
			activate(menu);
			pull.find('span').removeClass('icon-menu2').addClass('icon-close');
		}
	});
	menu.find('ul li a').on("click", function(){
		deactivate(menu);
		pull.find('span').removeClass('icon-close').addClass('icon-menu2');
	});
	
	$(".story").on("click", "a[href]:not('[href=#info], [href=#design-plans], [href=#video-flyover]')", function () {
		thisLink = $(this).attr('href');
		if ($(this).attr('rel=external')) {
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'External Link Clicked', thisLink]);
		} else if ($(this).attr('href') !== '#' && $(this).not('a[class="icon"]')) {
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Internal Link Clicked', thisLink]);
		}
	});
	
	$(".tabs").on("click", "a", function () {
		thisLink = $(this).text();
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Tab Clicked', thisLink]);
	});
	
	$(".bx-controls-direction").on("click", "a", function(){
		var arrow = $(this).attr('class'),
			slideshow = $(this).parent().parent().parent().prev('.media-heading').text();
		arrow = arrow.replace('bx-','');
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Slideshow Arrow Clicked', slideshow + ': ' + arrow]);
	});

	thumbnail.on("click", function(){
		var thumbnailTitle = $(this).find('.media-heading').first().text();
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Thumbnail Clicked', thumbnailTitle]);
	});

	media.on("click", "a:not('.bx-next, .bx-prev, [href=#info], [href=#design-plans], [href=#video-flyover], .brp-overlay')", function(){
		var mediaTitle = $(this).parent().find('.media-heading').first().text();
		_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Thumbnail Clicked', mediaTitle]);
	});

	//map overlay hover effect
	brpOverlayWrapper.on("click", function () {
		if (brpOverlay.hasClass('active')) {
			deactivate(brpOverlay);
		} else {
			activate(brpOverlay);
		}
	});

	//hide and show the navigation by clicking the arrow
	bottomNavToggle.on("click", function () {
		if (bottomNavigation.hasClass('active')) {
			closeBottomNav();
		} else {
			openBottomNav();
		}
	});
	
	//namecards hover effect
	$('.map-marker').hover(function () {
		$(this).prev().addClass('active');
	}, function () {
		$(this).prev().removeClass('active');
	});

	leftNavigation.hover(function () {
		openLeftNav();
		activate(leftNavToggle);
	}, function () {
		closeLeftNav();
		deactivate(leftNavToggle);
	});

	slide.waypoint(function (direction) {
		var currentCinemgraph = $(this).find(".cinemagraph")[0];
		if (direction === 'down') {
			var currentExplorer = $(this).find('h5').first().text();
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Scroll', 'Read ' + currentExplorer]);
		} else {
		}
	}, {offset: '75%'});
	
	$('#r-getty-browning').waypoint(function () {
		$('#video2')[0].pause();
		closeBottomNav();
	});
	
});
$(window).load(function () {
	$('.bxslider').bxSlider({
		mode: 'fade',
		captions: true,
		pager: false,
		preloadImages: 'all',
		adaptiveHeight: true,
		useCSS: true
	});
});


$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
			$('video').not("#video2").each(function(){
				if ($(this).is(":in-viewport")) {
					$(this)[0].play();
				} else {
					$(this)[0].pause();
				}
			})
    }, 250));
});