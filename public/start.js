/** cv.cssence.com startup script */

if (navigator.serviceWorker) {
	// navigator.serviceWorker.register('/sw.js');

	const is404 = location.pathname !== '/';

	const msg = document.createElement('div');
	msg.setAttribute('class', 'screen');
	msg.setAttribute('role', 'alert');
	if (is404) {
		msg.innerHTML = '<span hidden><i aria-hidden="true">404</i> Page not found</span>';
	}
	document.querySelector('body').prepend(msg);

	if (!navigator.onLine) {
		window.setTimeout(() => {
			document.querySelector('[role="alert"]').innerHTML = '<span hidden>You’re <i>offline</i>';
		}, is404 ? 5000 : 1000);
	}
}
