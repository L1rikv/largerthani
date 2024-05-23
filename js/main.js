'use strict';
//========================================================
//=====================MENU BURGER=============================

const menuIcon = document.querySelector('.menu__icon-menu');
const menuBody = document.querySelector('.menu__body');

menuIcon.addEventListener('click', function (evt) {
	menuBody.classList.toggle('_active-menu');
	document.body.classList.toggle('_lock');
	menuIcon.classList.toggle('_active-menu');
});

//========================================================
//=====================POPUP=============================

const body = document.querySelector('body');
const popups = document.querySelectorAll('.popup');
const popupLinks = document.querySelectorAll('._popup-link');
const popupCloseButtons = document.querySelectorAll('._close-popup');
const fixedElements = document.querySelectorAll('._lock-padding');

function hasPopupScroll(elem) {
	return elem.scrollHeight > elem.clientHeight;
}

function getScrollWidth() {
	return window.innerWidth - document.querySelector('.wrapper').offsetWidth;
}

const TIMEOUT = 800;
let unlock = true;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		let popupLink = popupLinks[i];
		popupLink.addEventListener('click', function (e) {
			let popupId = this.getAttribute('href').slice(1);
			let popupActive = document.getElementById(popupId);
			openPopup(popupActive);
			lockBody();
			e.preventDefault();

			unlock = false;
			setTimeout(() => {
				unlock = true;
			}, TIMEOUT);
		});
	}
}

if (popups.length > 0) {
	for (let i = 0; i < popups.length; i++) {
		let popup = popups[i];
		popup.addEventListener('click', function (e) {
			if (popup.classList.contains('_open-popup')) {
				if (
					e.target.closest('._close-popup') ||
					!e.target.closest('.popup__content')
				) {
					if (unlock) {
						closePopup(popup);
						unlockBody();
					}

					e.preventDefault();
				}
			}
		});

		document.addEventListener('keydown', function (e) {
			if (popup.classList.contains('_open-popup')) {
				if (e.code === 'Escape') {
					closePopup(popup);
					unlockBody();
				}
			}
		});
	}
}

function openPopup(popupActive) {
	if (popupActive && unlock) {
		if (!hasPopupScroll(popupActive)) {
			popupActive.style.paddingRight = getScrollWidth() + 'px';
		} else {
			popupActive.style.paddingRight = '0px';
		}

		let currentPopup = document.querySelector('._open-popup');

		if (currentPopup) {
			closePopup(currentPopup);

			if (hasPopupScroll(currentPopup)) {
				currentPopup.style.paddingRight = getScrollWidth() + 'px';
			}
		}

		popupActive.classList.add('_open-popup');
	}
}

function closePopup(popupActive) {
	popupActive.classList.remove('_open-popup');

	if (!hasPopupScroll(popupActive)) {
		popupActive.style.paddingRight = '0px';
	}
}

function lockBody() {
	const scrollWidth = getScrollWidth();

	for (let i = 0; i < fixedElements.length; i++) {
		const element = fixedElements[i];
		element.style.paddingRight = scrollWidth + 'px';
	}
	body.style.paddingRight = scrollWidth + 'px';
	body.classList.add('_lock');
}

function unlockBody() {
	for (let i = 0; i < fixedElements.length; i++) {
		const element = fixedElements[i];
		element.style.paddingRight = '0px';
	}
	body.style.paddingRight = '0px';
	body.classList.remove('_lock');
}
