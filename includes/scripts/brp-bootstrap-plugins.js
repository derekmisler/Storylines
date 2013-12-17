// DECLARE ALL VARIABLES 

var backtotop = $("#back-top");
var keepscrolling = $("#keep-scrolling");
var footer = $('#copyright');
var sidedrawer = $('#mapdrawer');
var sidedrawertext = $(sidedrawer).find('small')[ 0 ]

$(document).ready(function(){
	
	// turn on scrollspy, parallax
	$('body').stellar();
	$(".media").fitVids();
	Shadowbox.init();
	$("img.lazy").lazyload({
		threshold : 340,
		effect : "fadeIn"
	});
	
	// W
	// A
	// Y
	// P
	// O
	// I
	// N
	// T
	// S
		
//	function playYouTubeVideo(event) {
//		event.target.playVideo();
//	}
//	
//	$('.playbutton').click(function() {
//		var idType = 'data-video-id';
//		var id = $(this).attr(idType);
//		loadYouTubePlayer(id);
//		return false;
//	});	
	
	// back-to-top
	$(backtotop).find('a').click(function () {
		$('body,html').transition({
			scrollTop: 0
		}, 800);
		return false;
	});
  
	// map sidebar
	$(sidedrawer).click(function() {
    $('.row-offcanvas').toggleClass('active');
    $(sidedrawertext).text(function(_, oldText) {
         return oldText === 'Hide map.' ? 'View map.' : 'Hide map.';
     });
	});
	
	// scroll timer
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
//function initialize() {
//  var mapOptions = {
//    zoom: 11,
//    center: new google.maps.LatLng(35.483038, -82.424927),
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
//
//  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
//	var kmlLayer = new google.maps.KmlLayer('https://mapsengine.google.com/map/u/0/embed?mid=zgmMK7LBeUGI.kW2CiDEupeS8');
//	kmlLayer.setMap(map);
//	
//}
//
//function loadScript() {
//  var script = document.createElement('script');
//  script.type = 'text/javascript';
//  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
//  document.body.appendChild(script);
//}
//
//window.onload = loadScript;



// Twitter SDK
//!function(d,s,id){
//	var js,fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location)?'http':'https';
//	if(!d.getElementById(id)){
//		js=d.createElement(s);
//		js.async = true;
//		js.id=id;
//		js.src=p+'://platform.twitter.com/widgets.js';
//		fjs.parentNode.insertBefore(js,fjs);
//	}
//}(document, 'script', 'twitter-wjs');

// Google+ button
//(function() {
//	var po = document.createElement('script');
//	po.type = 'text/javascript';
//	po.async = true;
//	po.src = 'https://apis.google.com/js/plusone.js';
//	var s = document.getElementsByTagName('script')[0];
//	s.parentNode.insertBefore(po, s);
//})();

//fb like button
//(function(d, s, id) {
//	var js, fjs = d.getElementsByTagName(s)[0];
//	if (d.getElementById(id)) return;
//	js = d.createElement(s); js.id = id;
//  js.async = true;
//	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=183563235164799";
//	fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));

// Pinterest
//(function(d){
//  var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
//  p.type = 'text/javascript';
//  p.async = true;
//  p.src = '//assets.pinterest.com/js/pinit.js';
//  f.parentNode.insertBefore(p, f);
//}(document));