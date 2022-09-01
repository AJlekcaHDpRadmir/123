$(document).ready(function () {
	$('#mainStart').click(function () {
		let slide = document.getElementById('mainSlideEl')
		slide.scrollIntoView({
			block: "start",
			behavior: "smooth"
		});
	})

	$('#mainServers').click(function () {
		let slide = document.getElementById('mainServersList')
		slide.scrollIntoView({
			block: "start",
			behavior: "smooth"
		});
	})

	$('.slider-single').slick({

		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		adaptiveHeight: true,
		infinite: false,
		speed: 1000,
		easing: 'easy',
		cssEase: "easy",
		centerMode: true,
		useCSS: true,
		useTransform: true,
		waitForAnimate: true,
		responsive: [{
			breakpoint: 690,
			settings: {
				arrows: false,
			}
		}]
	});

	$('.slider-nav')
		.on('init', function (event, slick) {
			$('.slider-nav .slick-slide.slick-current').addClass('is-active');
			$('.slider-title').html($('.slider-nav .slick-slide.slick-current').eq(0).find('img').eq(0).data("caption"));
			back(event, slick)
			$('.back-stripes').addClass('stripe-animation')
		})
		.slick({
			slidesToShow: 7,
			slidesToScroll: 7,
			dots: false,
			arrows: false,
			focusOnSelect: false,
			infinite: false,
			asNavFor: '.slider-single',
			variableWidth: true,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			}, {
				breakpoint: 690,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}]
		});

	$('.slider-single').on('afterChange', function (event, slick, currentSlide) {
		$('.slider-nav').slick('slickGoTo', currentSlide);
		back(event, slick, currentSlide)

	});

	function back(event, slick, currentSlide) {
		if (!currentSlide) {
			currentSlide = $('.slider-single').slick('slickCurrentSlide')
		}

		var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
		$('.slider-nav .slick-slide.is-active').removeClass('is-active');
		$(currrentNavSlideElem).addClass('is-active');
		$('.slider-title').html($(currrentNavSlideElem).eq(0).find('img').eq(0).data("caption"))
		if (document.querySelector('.slider-single')) {
			const url = $('.acc-big-car').eq($('.slider-single').slick('slickCurrentSlide')).attr('src')
			Vibrant.from(url).getPalette().then((palette) => {
				$('#svgPointsBack').attr('style', `color: rgba( ${palette.Vibrant._rgb[0]}, ${palette.Vibrant._rgb[1]}, ${palette.Vibrant._rgb[2]}, 1);position:absolute;`)
				$('.back-stripes').attr('style', `
					background:  rgba( ${palette.Vibrant._rgb[0]}, ${palette.Vibrant._rgb[1]}, ${palette.Vibrant._rgb[2]}, 1);
					box-shadow:  0px 0px 176px  rgba( ${palette.Vibrant._rgb[0]}, ${palette.Vibrant._rgb[1]}, ${palette.Vibrant._rgb[2]}, 1);
				`)
			})
		}
	}

	$('.slider-nav').on('click', '.slick-slide', function (event) {
		event.preventDefault();
		var goToSingleSlide = $(this).data('slick-index');
		$('.back-stripes').removeClass('stripe-animation')

		setTimeout(() => {
			$('.back-stripes').addClass('stripe-animation')

		}, 1000);
		$('.slider-single').slick('slickGoTo', goToSingleSlide);
	});

	/***********************открываем моб меню*************************/
	$('.heder_open_mob_menu').click(function () {
		$(this).toggleClass('heder_open_mob_menu_active');
		$('.header_menu-abs').toggleClass('header_menu_active-mob');
	})
	//btn mobile on the main page//
	$(".main-hidden-btn-server-mobile__btn").each(function () {
		$(this).on("click", function () {
			$(this).find(".main-btn-url-mob").addClass('main-hidden-mobile');
			$(this).parent().find(".main-hidden-btn-server-mobile__span").addClass('main-hidden-mobile-span');
		})
			.on("animationend", function () {
				$(this).find(".main-btn-url-mob").removeClass('main-hidden-mobile ');
				$(this).parent().find(".main-hidden-btn-server-mobile__span").removeClass('main-hidden-mobile-span');
			});
	})
	$('.close-restore').click(function () {
		$('.login-restore').css({
			'opacity': '0',
			'z-index': '-1',
			'transform': 'translateY(600px)'
		})
		$('.back-login-hidden').css('display', 'none')
		$('.logo-hide-wrap').css({
			'background': 'none',
		})
	})
	$('.slick-arrow').click(function () {

		$('.back-stripes').removeClass('stripe-animation')

		setTimeout(() => {
			$('.back-stripes').addClass('stripe-animation')

		}, 1000);

	})

	// modals account
	$('.modals-close').click(function () {
		let id = $(this).parent().attr('id')
		$('#' + id).parent().css({
			'opacity': '0',
			'z-index': '-1'
		})
		$('#' + id).css({
			'opacity': '0',
			'transform': 'translateY(300%)'
		})
	})
	$('.account-info__start-menu-el').click(function () {
		let id = $(this).data('id')
		$('#' + id).css({
			'opacity': '1',
			'transform': 'translateY(0%)'
		})
		if (!id) return
		$('#' + id).parent().css({
			'opacity': '1',
			'z-index': '101'
		})

	})
	// modals account

	$('.donate-choose-table_tab').click(function () {
		if ($('input[name=donateTabs]:checked').val() === 'donateWhite') {
			$('.view-el').css('transform', 'translateX(-367px)')
		} else {
			$('.view-el').css('transform', 'translateX(0px)')
		}
	})
	//show menu account (mobile)
	$('.header-mob__user').click(function () {
		$('.acc-mobile-menu').addClass('acc-animate')

	})

	$('.acc-menu-mobile__cover').click(function () {
		$('.acc-mobile-menu').removeClass('acc-animate')
	})

	$('.login-to-restore').click(function () {
		$('.login-restore').css({
			'opacity': '1',
			'z-index': '100',
			'transform': 'translateY(0px)'
		})
		$('.back-login-hidden').css('display', 'flex')
		$('.logo-hide-wrap').css('background', 'rgba(25, 25, 25, 0.8)')
	})


	$('.top-level').click(function () {
		$('.top-level-table').css('display', 'table')
		$('.forbes-tabs').css('justify-content', 'flex-end')
		$('.top-rich-table').css('display', 'none')
		$('.tab-hr-div').addClass('top-level-hr')
		$('.top-rich').removeClass('active-tab')
		$('.top-level').addClass('active-tab')
		if (window.matchMedia('(max-width: 690px)').matches) {
			$('.forbes-page__table').css('transform', 'scale(0.8) translateX(-125%)')
		}

	})
	$('.top-rich').click(function () {
		$('.top-level-table').css('display', 'none')
		$('.forbes-tabs').css('justify-content', 'flex-start')
		$('.top-rich-table').css('display', 'table')
		$('.tab-hr-div').removeClass('top-level-hr')
		$('.top-level').removeClass('active-tab')
		$('.top-rich').addClass('active-tab')
		if (window.matchMedia('(max-width: 690px)').matches) {
			$('.forbes-page__table').css('transform', 'scale(0.8) translateX(0%)')
		}
	})


	$('.restore-back').click(function () {
		$('.login-restore').css({
			'opacity': '0',
			'z-index': '-1',
			'transform': 'translateY(600px)'
		})
		$('.back-login-hidden').css('display', 'none')

	})
	$('.view-white').click(function () {
		$('.view-black ').css({
			'opacity': '1',
			'z-index': '1000'
		})
	})
	$('.view-black').click(function () {
		$('.view-black ').css({
			'opacity': '0',
			'z-index': '-1'
		})
	})
	$('.open_popup_buy_coins').click(function () {
		$('.black-wrapper').addClass('black-wrapper-opend');
	})

	/************* добавяем цвет для лейбла в попапе, если инпут в фокусе ***************/
	$('.popup_input input').focus(function () {
		$('.popup_input label').css('color', 'rgba(255, 255, 255, 1.0)');
	});
	$('.popup_input input').blur(function () {
		$('.popup_input label').css('color', 'rgba(255, 255, 255, 0.45)');
	});

	/****************попап окно для покупки монет*****************/
	$('.open_popup_buy_coins').click(function () {
		$('.popup_buy_coins').addClass('popup_opend');
		$('.black-wrapper').show()
		// $('body').addClass('hide-body-overflow');
	})

	$('.close_popup, .black-wrapper').click(function () {
		$('.popup_buy_coins').removeClass('popup_opend');
		$('.black-wrapper').removeClass('black-wrapper-opend');
		// $('body').removeClass('hide-body-overflow');
	})
	/******************попап для донат пакетов************************/
	$('.donat_slider_item').click(function () {

		var donatPrice = $(this).find('.donat_slider_item_price').text();
		var donatePackName = $(this).find('.donat_slider_item_content h3').text();
		var donateReward = $(this).find('.donat_slider_item_reward').text();
		var donateOldReward = $(this).find('.donat_slider_item_old_reward').text();
		var x2label = $(this).find('.donat_slider_item_label').length;

		$('.popup_donate_pack_price').text(donatPrice);
		$('.popup_donate_pack_name p').text(donatePackName);
		$('.popup_donate_pack_reward').text(donateReward);
		$('.popup_donate_pack_old_reward').text(donateOldReward);
		if (x2label == 1) {
			$('.x2-label').css('visibility', 'visible');
		}


		$('.popup_donate_pack').addClass('popup_opend');
		$('.black-wrapper').addClass('black-wrapper-opend');
		// $('body').addClass('hide-body-overflow');
	})
	$('.close_popup, .black-wrapper').click(function () {
		$('.popup_donate_pack').removeClass('popup_opend');
		$('.black-wrapper').removeClass('black-wrapper-opend');
		// $('body').removeClass('hide-body-overflow');
		setTimeout(function () {
			$('.x2-label').css('visibility', 'hidden');
		}, 500)

	});
	/****************поап для донат номера********************/

	$('.open_popup_get_car_number').click(function () {
		$('.popup_donate_number').addClass('popup_opend');
		$('.black-wrapper').addClass('black-wrapper-opend');
		// $('body').addClass('hide-body-overflow');
	})

	$('.close_popup, .black-wrapper').click(function () {
		$('.popup_donate_number').removeClass('popup_opend');
		$('.black-wrapper').removeClass('black-wrapper-opend');
		// $('body').removeClass('hide-body-overflow');
	})

	const $otp_length = 1;
	const element = document.getElementById('OTPInput');
	for (let i = 0; i < $otp_length; i++) {
		let inputField = document.createElement('input');
		inputField.style.cssText = "height: 27px;";
		inputField.id = 'otp-field' + i;
		inputField.class = 'input';
		inputField.maxLength = 12;
		inputField.patter = "[A-z0-9]{5}"
		element.appendChild(inputField);
	}
	const inputs = document.querySelectorAll('#OTPInput > *[id]');
	document.querySelector('#OTPInput').addEventListener("input", function () {
		let pResult = $('.popup_donate_number_preview');
		let readyInput = document.getElementById('otp');
		const inputs = document.querySelectorAll('#OTPInput > *[id]');
		let compiledOtp = '';
		for (let i = 0; i < inputs.length; i++) {
			compiledOtp += inputs[i].value;
		}
		document.getElementById('otp').value = compiledOtp;
		pResult.each(function () { $(this).text(compiledOtp); })
		readyInput.innerHTML = compiledOtp;
		if (compiledOtp == '') {
			pResult.text = 'UNTITLED';
		}
		return true;

	});



})