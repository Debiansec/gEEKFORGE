(function () {
	'use strict';
	var button = document.querySelector('.menu-toggle');
	var menu = document.querySelector('.main-navigation');
	if (!button || !menu) return;
	button.addEventListener('click', function () {
		var open = menu.classList.toggle('is-open');
		button.setAttribute('aria-expanded', open ? 'true' : 'false');
	});
}());
