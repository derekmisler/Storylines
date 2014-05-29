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
		links = $('.navigation').not('.social').find('li'),
		mapmarker = $('.map-marker'),
		namecards = $('.namecard'),
		topSlide = $('.titlecard'),
		topVideo = $('#video'),
		topVideo2 = $('#video2'),
		wind = $("#wind").get(0),
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
		wind.volume = 0.15;
		wind.play();
		openBottomNav();
	}
	//function showImages() {
	//	$("img.lazy").trigger("sporty");
	//}
	//Go!
	//Go!
	//Go!
	//Go!

	//anatomy of a view overlay hover effect
	/*$('#anatomy .brp-overlay').toggle(function () {
		$(this).find('img').animate({'opacity': 0}, 1000);
	}, function () {
		$(this).find('img').animate({'opacity': 1}, 1000);
	});*/

	$('h1, p, .media-caption').each(function () {
		$(this).html($(this).html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1'));
	});
	
	//var fadeInImages = setTimeout(showImages, 0);
	
	$('.youtube').fitVids();
	$("img.lazy").lazyload({
		placeholder : "http://www.exploreasheville.com/includes/images/assets/1pixel.gif",
		effect : "fadeIn",
		skip_invisible : false,
		failure_limit : 1000
	});

	$('.bxslider').bxSlider({
		captions: true,
		pager: false
	});
	
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	//video stuff
	if (notMobileScreen) {
//		$.stellar({
//			responsive: true,
//			hideDistantElements: false,
//			positionProperty: 'position',
//			horizontalScrolling: false,
//			parallaxBackgrounds: false
//		});
		var topVideoFadeIn = setTimeout(showVideo, 3000);
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
			topVideo.get(0).play();
		});
		topVideo2.on("click", function (e) {
			if (topVideo2.get(0).paused && topVideo2.hasClass('active')) {
				topVideo2.get(0).play();
			} else {
				topVideo2.get(0).pause();
			}
		});
		topSlide.on("click", function (e) {
			e.preventDefault();
			if (topVideoControls.hasClass('active')) {
				deactivate(topVideoControls);
				topVideo.get(0).pause();
				topVideo.animate({"opacity": 0.5}, 1000);
				topVideo2.animate({"opacity": 1}, 1000);
				activate(topVideo2);
				topVideo2.get(0).play();
			} else {
				topVideo2.get(0).pause();
			}
		});
	}
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
			pull.find('span').removeClass('icon-close').addClass('icon-arrow-up');
		} else {
			activate(menu);
			pull.find('span').removeClass('icon-arrow-up').addClass('icon-close');
		}
	});
	menu.find('ul li a').on("click", function(){
		deactivate(menu);
		pull.find('span').removeClass('icon-close').addClass('icon-arrow-up');
	});
	
	$(".story").on("click", "a[href]", function () {
		thisLink = $(this).attr('href');
		if ($(this).attr('rel')) {
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'External Link Clicked', thisLink]);
		} else if ($(this).attr('href') !== '#' && $(this).not('a[class="icon"]')) {
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Internal Link Clicked', thisLink]);
		}
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

	//map overlay hover effect
	brpOverlayWrapper.on("click", function () {
		if (brpOverlay.hasClass('active')) {
			deactivate(brpOverlay);
		} else {
			activate(brpOverlay);
		}
	});

	//map overlay hover effect
	/*linncoveFlyover.on("click", function () {
		if (linncoveFlyoverButton.hasClass('active')) {
			deactivate(linncoveFlyoverButton);
			linncoveFlyover.find("video").get(0).play();
		} else {
			activate(linncoveFlyoverButton);
			linncoveFlyover.find("video").get(0).pause();
		}
	});*/

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
		var currentCinemgraph = $(this).find(".cinemagraph").get(0);
		if (direction === 'down') {
			currentCinemgraph.play();
			var currentExplorer = $(this).find('h5').first().text();
			_gaq.push(['pageTracker._trackEvent', 'Explorers of the Blue Ridge Parkway', 'Scroll', 'Read ' + currentExplorer]);
		} else {
			currentCinemgraph.pause();
		}
	}, {offset: '50%'});

	noslide.waypoint(function (direction) {
		var prevCinemgraph = $(this).parent().find(".cinemagraph").get(0);
		if (direction === 'down') {
			prevCinemgraph.pause();
		} else {
			prevCinemgraph.play();
		}
	});

	$('#r-getty-browning').waypoint(function () {
		$('#video2').get(0).pause();
		closeBottomNav();
	});
	
});
