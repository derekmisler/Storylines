// DECLARE ALL VARIABLES 
var topfeaturette = $('#topvideo');
var introheading = $('#header');
var timelapse = $('#video');
var videowidth = $(document).width();
var videoheight = Math.floor(videowidth * .42);
var intro = $("#intro");
var flyovercontainer = $(".flyover-container");
var flyover = $("#flyover");
var flyoverheight = Math.floor(videowidth * .56);
var elementafterflyover = flyovercontainer.next('section');
var mapoverlaybutton = $('#map-flyover-map a');
var mapoverlay = $('#map-flyover-map img');
var slideshow = $('#myCarousel');
var carouselheight;
var map = $("#map");
var screenImage = $("#mapimage");
var hotspotcontainer = $(".hotspotcontainer");
var hotspots = $(".hotspotbutton");
var hotspotsinfo = $(".hotspotcontainer div .info");
var hotspotsinfoheight = '320px';
var closebutton = $(".info button.close");
var backtotop = $("#back-top");
var keepscrolling = $("#keep-scrolling");
var footer = $('#copyright');

$(document).ready(function(){
	
	// start the intro video
	// videoheight = timelapse.height();
	if (videoheight > '0'){
		// fade in title
		topfeaturette.css({'height': videoheight + 'px'}),
		intro.delay(1000).transition({'marginTop': videoheight + 'px'}, 5000),
		introheading.transition({ opacity: 1 }, 2000, 'ease');
	}
	else{
		// fade in title
		introheading.transition({ opacity: 1 }, 0),
		topfeaturette.css({'position': 'relative'});
	}

	// turn on scrollspy, parallax
	$('body').scrollspy({ target: '.top-nav' }).stellar();
	$(".media").fitVids();
	Shadowbox.init();
	$("img.lazy").lazyload({
		threshold : 340,
		effect : "fadeIn"
	});

	// get flyover ready
	// flyoverheight = flyover.height();
	flyovercontainer.css('height', flyoverheight + 'px');
	flyover.css({ opacity: 0 }, 0);

	// W
	// A
	// Y
	// P
	// O
	// I
	// N
	// T
	// S
	
	// stop and hide the top timelapse when it's off-screen
	intro.waypoint(function (direction) {
		if(direction == 'down')
			_gaq.push(['pageTracker._trackEvent', 'Science of Fall Color', 'Scroll', 'User Scrolled past the Timelapse Loop']),
			topfeaturette.stop().transition({ opacity: 0 }, 1000),
			timelapse[0].pause(),
			$(backtotop).transition({opacity:1});
		else {
			topfeaturette.stop().transition({ opacity: 1 }, 500),
			timelapse[0].play(),
			$(backtotop).transition({opacity:0});
		}
	}, { offset: '-50px' });

	// fade in and start the flyover when it hits the screen
	flyovercontainer.waypoint(function (direction) {
		if(direction == 'down')
			flyover.stop().transition({ opacity: 1 }, 1000),
			flyover[0].play();
		else {
			flyover.stop().transition({ opacity: 0 }, 1000),
			flyover[0].pause();
		}
	}, { offset: '50%' });
	
	// make the flyover stick to the top and have the content cover it
	flyovercontainer.waypoint(function (direction) {
		if(direction == 'down')
			flyovercontainer.addClass('affix'),
			elementafterflyover.css('marginTop', flyoverheight + 'px');
		else {
			flyovercontainer.removeClass('affix'),
			elementafterflyover.css('marginTop', '0px');
		}
	}, { offset: '-100px' });
	
	// fade out and stop the flyover when the user scrolls past it
	flyovercontainer.waypoint(function (direction) {
		if(direction == 'down')
			_gaq.push(['pageTracker._trackEvent', 'Science of Fall Color', 'Scroll', 'User Scrolled to the Flyover']),
			flyover.stop().transition({ opacity: 0 }, 1000),
			flyover[0].pause();
		else {
			flyover.stop().transition({ opacity: 1 }, 1000),
			flyover[0].play();
		}
	}, { offset: '-600px' });

	// flyover overlay
	mapoverlaybutton.hover(function() {
		mapoverlay.stop().transition({ opacity: .9 }, 200);
	},function() {
		mapoverlay.stop().transition({ opacity: 0 }, 500);
	});
	// youtube
	$.getScript('http://www.youtube.com/player_api');
	
	loadYouTubePlayer = function(playerID) {
		the_player = new YT.Player(playerID, {
			events: { 'onReady': playYouTubeVideo }
		});
	};  
	
	function playYouTubeVideo(event) {
		event.target.playVideo();
	}
	
	$('.playbutton').click(function() {
		var idType = 'data-video-id';
		var id = $(this).attr(idType);
		loadYouTubePlayer(id);
		return false;
	});	
	
	// footer
	$("#comments").waypoint(function (direction) {
		if(direction == 'down')
			_gaq.push(['pageTracker._trackEvent', 'Science of Fall Color', 'Scroll', 'User Scrolled to the Comments']),
			footer.stop().transition({ bottom: 0 }, 200);
		else {
			footer.stop().transition({ bottom: '-58px' }, 200);
		}
	}, { offset: '90%' });

	// back-to-top
	$(backtotop).find('a').click(function () {
		$('body,html').transition({
			scrollTop: 0
		}, 800);
		return false;
	});

	// map
	hotspotcontainer.hover(function() {
		hotspots.stop().transition({ opacity: .5 }, 200);
	},function() {
		hotspots.stop().transition({ opacity: 0 }, 200);
	});
	
	hotspotsinfo.each( function() {
		$(this).transition({
			opacity:0,
			bottom:"-" + hotspotsinfoheight
		}, 0);
	});

	$(hotspots).bind( "click", function() {
		$(hotspotsinfo).stop().transition({
			opacity:0,
			bottom:"-" + hotspotsinfoheight
		}, 200)
		$(this).next(hotspotsinfo).stop().transition({
			opacity: 1,
			bottom: "-10px"
		}, 200)
	});
	
	$(closebutton).bind( "click", function() {
		$(this).parent(hotspotsinfo).stop().transition({
			opacity:0,
			bottom:"-" + hotspotsinfoheight
		}, 200);
	});

	$(window).scroll(function() {
		keepscrolling.stop().transition({opacity:0}, 250);
		clearTimeout($.data(this, 'scrollTimer'));
		
		$(document).click(function() {
			keepscrolling.stop().transition({opacity:0}, 250);
			clearTimeout($.data(this, 'scrollTimer'));
		});
		
		$.data(this, 'scrollTimer', setTimeout(function() {
			if($(window).scrollTop() + $(window).height() != $(document).height()) {
				keepscrolling.stop().transition({opacity:1}, 1000);
			}
		}, 8000));
		
	});
	
});
function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(35.483038, -82.424927),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	var kmlLayer = new google.maps.KmlLayer('https://maps.google.com/maps/ms?ie=UTF8&t=m&authuser=0&msa=0&output=kml&msid=216187806625704159136.0004e5d1cb640d860b8fc');
	kmlLayer.setMap(map);
	
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;


/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
var disqus_shortname = 'exploreashevillefall'; // required: replace example with your forum shortname

// Comments code
(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
// Comment count code
(function () {
		var s = document.createElement('script'); s.async = true;
		s.type = 'text/javascript';
		s.src = '//' + disqus_shortname + '.disqus.com/count.js';
		(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}());
  
// Twitter SDK
!function(d,s,id){
	var js,fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.async = true;
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document, 'script', 'twitter-wjs');


// Google+ button
(function() {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();



/* fb like button
 * ========================================================== */

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=183563235164799";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Pinterest
(function(d){
  var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
  p.type = 'text/javascript';
  p.async = true;
  p.src = '//assets.pinterest.com/js/pinit.js';
  f.parentNode.insertBefore(p, f);
}(document));


	
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0016/9635.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
