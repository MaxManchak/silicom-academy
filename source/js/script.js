(function($) {
	$('.js-nav-toggle').click(function() {
		console.log('click');

		$(this).toggleClass('nav-toggle--active');
		$('.header').toggleClass('header--active');
		$('body').toggleClass('fixed');
	});

	let hideNavigation = () => {
		$('.js-nav-toggle').removeClass('nav-toggle--active');
		$('.header').removeClass('header--active');
		$('body').removeClass('fixed');
	};

	let scrollSite = href => {
		$('html').animate(
			{
				scrollTop: $(href).offset().top - 138, // прокручиваем страницу к требуемому элементу
			},
			500 // скорость прокрутки
		);
	};
	$('.js-navigation a').click(function(e) {
		// e.preventDefault();
		hideNavigation();

		var href = $(this).attr('href');
		if ($(window).width() >= 1000) {
			scrollSite(href);
		}
	});

	if ($(window).width() > 1000) {
		$('body').css({ 'padding-top': $('.header').height() + 'px' });
	} else {
		$('.js-team').slick({
			infinite: true,
			slidesToScroll: 1,
			centerMode: true,
			dots: true,
			arrows: false,
			centerPadding: '60px',
			slidesToShow: 1,
		});
	}
	// позиционируем левое меню
	let fixedLeftNavigation = windowPosition => {
		let position = $('#1').offset().top;

		if (windowPosition >= position - 138) {
			$('.left-navigation').addClass('fixed');
		} else {
			$('.left-navigation').removeClass('fixed');
		}
	};

	// проверка находится ли блок в зоне поля зрения
	let leftActivePoint = windowPosition => {
		$('.left-navigation__item').each(function() {
			var element = $(this).data('id');

			if ($('#' + element).offset().top - $(window).height() / 2 < windowPosition) {
				$('.left-navigation__item').removeClass('active');
				$(this).addClass('active');
			}
		});
	};

	let topNavigationActive = windowPosition => {
		$('.navigation a').each(function() {
			var element = $(this).attr('href');
			if ($(element).offset().top - $(window).height() / 2 < windowPosition) {
				$('.navigation a').removeClass('active');
				$(this).addClass('active');
			}
		});
	};

	$(window).scroll(function() {
		if ($(window).width() > 1000) {
			let windowScrollPosition = $(window).scrollTop();
			fixedLeftNavigation(windowScrollPosition);
			leftActivePoint(windowScrollPosition);
			topNavigationActive(windowScrollPosition);
		}
	});
})(jQuery);
