/*
	Apex by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on mobile.
		skel.on('+mobile -mobile', function() {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		// Dropdowns.
		$('#page-header nav > ul').dropotron({
			offsetY: -13
		});

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Off-Canvas Navigation.

		// Title Bar.
		$(
				'<div id="titleBar">' +
				'<a href="#navPanel" class="toggle"></a>' +
				'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
			.appendTo($body);

		// Navigation Panel.
		$(
				'<div id="navPanel">' +
				'<nav>' +
				$('#nav').navList() +
				'</nav>' +
				'</div>'
			)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
		if(skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#titleBar, #navPanel, #page-wrapper')
			.css('transition', 'none');

		// Banner.
		var $banner = $('#banner');
		if($banner.length > 0) {

			$banner.slidertron({
				mode: 'fade',
				viewerSelector: '.viewer',
				reelSelector: '.viewer .reel',
				slidesSelector: '.viewer .reel .slide',
				navNextSelector: '.nav-next',
				navPreviousSelector: '.nav-previous',				
				captionLineSelector: '.caption-line-',
				slideCaptionSelector: '.caption-',
				captionLines: 2,
				advanceDelay: 7500,
				speed: 1000,
				autoFit: true,
				autoFitAspectRatio: (1920 / 556),
				seamlessWrap: false
			});

			$window
				.on('resize load', function() {
					$banner.trigger('slidertron_reFit');
				})
				.trigger('resize');

		}

		// brand.
		$('#brand > article')
			.css('cursor', 'pointer')
			.on('click', 'a', function(event) {
				event.stopPropagation();
			})
			.on('click', function(event) {

				event.preventDefault();
				event.stopPropagation();

				var $a = $(this).find('a');

				if($a.length > 0)
					window.location.href = $a.attr('href');

			})
			.each(function() {

				var $this = $(this),
					$img = $this.children('img'),
					x;

				// Assign image.
				$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
				if(x = $img.data('position'))
					$this.css('background-position', x);

				// Hide <img>.
				$img.hide();

			});

	});

})(jQuery);