"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)

			if (!container && !toggle) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.mobileMenu();

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', () => {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	};
	const swiper4 = new Swiper('.sStudentsCases__slider--js', {
		slidesPerView: 1,
		loop: false,
		navigation: {
			nextEl: '.sStudentsCases .swiper-button-next',
			prevEl: '.sStudentsCases .swiper-button-prev'
		}
	});
	const swiper5 = new Swiper('.sRewsSlider__slider--js', {
		slidesPerView: 1,
		loop: false,
		navigation: {
			nextEl: '.sRewsSlider .swiper-button-next',
			prevEl: '.sRewsSlider .swiper-button-prev'
		}
	});
	let videoBlockPlay = document.querySelectorAll(".video-item__video");
	videoBlockPlay.forEach(el => {
		el.addEventListener('click', () => {
			el.classList.add("play-video");
			el.innerHTML = el.dataset.video;
		});
	});
	$(".dd-head-js").click(function () {
		$(this).toggleClass("active").next().slideToggle();
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }