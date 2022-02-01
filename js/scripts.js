$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Моб. меню
	$('header .mob_menu_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).addClass('active')
			$('header .menu').fadeIn(300)
		} else {
			$(this).removeClass('active')
			$('header .menu').fadeOut(200)
		}
	})


	// Фиксирпованная картинка
	if ($('.fixed_img').length) {
		image = $('.fixed_img'),
			stopBlock = $('.about_info'),
			startOffset = $('header').outerHeight() + $('.main_slider').outerHeight() * 0.5 - image.height() * 0.5,
			imageStopOffset = stopBlock.offset().top + stopBlock.outerHeight() * 0.5 - image.height() * 0.5

		image.css('transform', 'translateY(' + startOffset + 'px)')

		$(window).scrollTop() >= (imageStopOffset - startOffset)
			? image.addClass('stop').css('transform', 'translateY(' + imageStopOffset + 'px)')
			: image.removeClass('stop').css('transform', 'translateY(' + startOffset + 'px)')
	}
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 480) $('meta[name=viewport]').attr('content', 'width=480, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > 0
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = $(window).width()
	}
})


$(window).on('scroll', () => {
	// Фиксирпованная картинка
	if ($('.fixed_img').length) {
		$(window).scrollTop() >= (imageStopOffset - startOffset)
			? image.addClass('stop').css('transform', 'translateY(' + imageStopOffset + 'px)')
			: image.removeClass('stop').css('transform', 'translateY(' + startOffset + 'px)')
	}


	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



// Анимация
const boxes = document.querySelectorAll('.observer')

function scrollTracking(entries) {
	for (const entry of entries) {
		if (entry.intersectionRatio >= 0.2) {
			entry.target.classList.add('animated')
		}
	}
}

const observerClass = new IntersectionObserver(scrollTracking, {
	threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
})

boxes.forEach(element => observerClass.observe(element))