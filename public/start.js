/** cv.cssence.com startup script */

if (navigator.serviceWorker) {
	// navigator.serviceWorker.register('/sw.js');

	const is404 = document.querySelector('title').textContent.startsWith('404');
	const notify = (info, label) => `<span class="visually-hidden">${info}.</span><span aria-hidden="true" hidden>${label}</span>`;

	const msg = document.createElement('div');
	msg.setAttribute('class', 'screen');
	msg.setAttribute('role', 'alert');
	if (is404) {
		msg.innerHTML = notify('Page not found', '<i>404</i> Page not found');
	}
	document.querySelector('body').prepend(msg);

	if (!navigator.onLine) {
		window.setTimeout(() => {
			document.querySelector('[role="alert"]').innerHTML = notify('You are offline', 'You’re <i>offline</i>');
		}, is404 ? 5000 : 1000);
	}
}
