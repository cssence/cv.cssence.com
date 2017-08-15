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
					"/offline.html",
					"/style.min.css",
					"/photo.jpg"
				]))
		);
	});

	self.addEventListener("fetch", event => {
		const request = event.request;
		/*if (request.method !== "GET") { // POST, etc.
			event.respondWith(
				fetch(request)
					.catch(() => {
						return caches.match("/offline.html");
					})
			);
			return;
		}*/
		/*const url = new URL(request.url);
		if (url.origin === location.origin && url.pathname === "/") {
			event.respondWith(
				caches.match("/index.html")
			);
			return;
		}*/
		/*if (["json", "svg", "ico")].indexOf(url.pathname.split(".").pop() !== -1) {
			event.respondWith(
				fetch(request)
					.catch(() => {
						return caches.match("/offline.html");
					})
			);
			return;
		}*/
		event.respondWith(
			caches.match(request)
				.then(response => response || fetch(request).catch(() => {
						return caches.match("/offline.html");
					})
				)
		);
	});

})();
