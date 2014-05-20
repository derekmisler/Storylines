/* global alert, jquery, $, document, window, Modernizr, setTimeout */
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
		topVideoControls = $('#top .drawerbutton'),
		topStory = $('#top').find('.noslide'),
		topSlideScroll = $('#top .scroll'),
		caption = $('.header'),
		cinemagraphs = $('article'),
		slide = $('.slide'),
		noslide = $('.noslide'),
		brpOverlayWrapper = $('#design-plans .brp-overlay'),
		brpOverlay = brpOverlayWrapper.find('img').last(),
		linncoveFlyover = $("#video-flyover .brp-overlay"),
		linncoveFlyoverButton = $("#video-flyover .brp-overlay").find(".drawerbutton"),
		notMobileScreen = Modernizr.mq('only screen and (min-width: 768px)');

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
		$("img.lazy").trigger("sporty");
		topSlide.animate({"opacity": 1}, 1500).addClass('active');
	}

	//Go!
	$('h1,h2,h3,li,p,.media-caption').each(function () {
		$(this).html($(this).html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1'));
	});

	if (notMobileScreen) {
		$.stellar({
			responsive: true,
			hideDistantElements: false,
			positionProperty: 'position',
			horizontalScrolling: false,
			parallaxBackgrounds: false
		});
	}
	
	$('.youtube').fitVids();
	$("img.lazy").lazyload({
		placeholder : "http://www.exploreasheville.com/includes/images/assets/1pixel.gif",
		effect : "fadeIn",
		skip_invisible : false,
		failure_limit : 1000,
		event : "sporty"
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

	var t = setTimeout(showVideo, 1500);
	topVideo2.bind('play', function () {
		deactivate(topVideoControls);
		closeBottomNav();
		topSlide.animate({"opacity": 0}, 500);
	});
	topVideo2.bind('pause', function () {
		activate(topVideoControls);
		topSlide.animate({"opacity": 1}, 500);
	});
	topVideo2.bind('ended', function () {
		activate(topVideoControls);
		deactivate(topVideo2);
		topVideo2.animate({"opacity": 0}, 1000);
		topVideo.animate({"opacity": 1}, 1000);
		topSlide.animate({"opacity": 1}, 500);
		topVideo.get(0).play();
	});
	topVideo2.click(function (e) {
		if (topVideo2.get(0).paused && topVideo2.hasClass('active')) {
			topVideo2.get(0).play();
		} else {
			topVideo2.get(0).pause();
		}
	});
	topSlide.click(function (e) {
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
	links.click(function (e) {
		//e.preventDefault();
		deactivate(namecards);
		var dataslide = $(this).attr('data-story');
		goToByScroll(dataslide);
	});
	
	//map overlay hover effect
	brpOverlayWrapper.click(function () {
		if (brpOverlay.hasClass('active')) {
			deactivate(brpOverlay);
		} else {
			activate(brpOverlay);
		}
	});

	//map overlay hover effect
	linncoveFlyover.click(function () {
		if (linncoveFlyoverButton.hasClass('active')) {
			deactivate(linncoveFlyoverButton);
			linncoveFlyover.find("video").get(0).play();
		} else {
			activate(linncoveFlyoverButton);
			linncoveFlyover.find("video").get(0).pause();
		}
	});

	//hide and show the navigation by clicking the arrow
	bottomNavToggle.click(function (e) {
		e.preventDefault();
		bottomNavigation.toggleClass('active');
	});
	
	//namecards hover effect
	$('.map-marker').hover(function () {
		$(this).prev().addClass('active');
		//alert('over');
	}, function () {
		$(this).prev().removeClass('active');
		//alert('out');
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
		} else {
			currentCinemgraph.pause();
		}
	}, {offset: '50%'});

	noslide.waypoint(function (direction) {
		var prevCinemgraph = $(this).prev().find(".cinemagraph").get(0);
		if (direction === 'down') {
			prevCinemgraph.pause();
		} else {
			prevCinemgraph.play();
		}
	});

	$('#top').find('.noslide').waypoint(function (direction) {
		if (direction === 'down') { openBottomNav(); }
	}, { offset: '75%' }).waypoint(function (direction) {
		if (direction === 'down') { closeBottomNav(); }
	}, { offset: '0' });
	
/*	caption.waypoint(function (direction) {
		//cache the variable of the data-story attribute associated with each slide
		var dataslide = $(this).attr('data-story');
		if (direction === 'down') {
			//If the user scrolls down, remove the 'currentslide' class from the previous nav highlight the current slide in the navigation
			$('.bottom.navigation li[data-story="' + dataslide + '"]').addClass('currentslide').prev().removeClass('currentslide');
		} else {
			$('.bottom.navigation li[data-story="' + dataslide + '"]').addClass('currentslide').next().removeClass('currentslide');
		}
	}, {
		offset: '50%'
	});*/
	


});
