/**
* Service Worker for https://matthias.beitl.net/
*
* Shoutout to @adactio, @jaffathecake and @mxbck, as this is based on
* https://gist.github.com/adactio/fbaa3a5952774553f5e7,
* https://www.youtube.com/watch?v=qDJAz3IIq18 and
* https://mxb.at/blog/how-to-turn-your-website-into-a-pwa/
*/

/*jshint esversion: 6 */

(function() {
	"use strict";

	const cacheName = "assets";
	const cacheVersion = "v1";

	self.addEventListener("install", event => {
		event.waitUntil(
			caches.open([cacheName, cacheVersion].join("-"))
				.then(cache => cache.addAll([
					"/index.html",
					"/photo.jpg"
				]))
		);
	});

	self.addEventListener("fetch", event => {
		const request = event.request;
		event.respondWith(
			caches.match(request)
				.then(response => response || fetch(request).catch(() => {
						return caches.match("/index.html");
					})
				)
		);
	});

})();
