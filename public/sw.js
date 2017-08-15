/**
* Service Worker for https://matthias.beitl.net/
*
* Shoutout to @adactio, @jaffathecake and @mxbck, as this is based on
* https://gist.github.com/adactio/fbaa3a5952774553f5e7,
* https://www.youtube.com/watch?v=qDJAz3IIq18 and
* https://mxb.at/blog/how-to-turn-your-website-into-a-pwa/
*/

(function() {
	"use strict";

	var cacheName = "assets";
	var cacheVersion = "v1";

	self.addEventListener("install", function (event) {
		event.waitUntil(
			caches.open([cacheName, cacheVersion].join("-"))
				.then(function (cache) {
					cache.addAll([
						"/index.html",
						"/offline.html",
						"/style.min.css",
						"/photo.jpg"
					]);
				})
		);
	});

	self.addEventListener("fetch", function (event) {
		var request = event.request;
		event.respondWith(
			caches.match(request)
				.then(function (response) {
					response = response || fetch(request).catch(function () {
						return caches.match("/offline.html");
					});
					return response;
				})
		);
	});

})();
