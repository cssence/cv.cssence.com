/**
* Service Worker for https://matthias.beitl.net/
*
* Shoutout to @adactio, @jaffathecake and @mxbck, as this was based on
* https://gist.github.com/adactio/fbaa3a5952774553f5e7,
* https://www.youtube.com/watch?v=qDJAz3IIq18 and
* https://mxb.at/blog/how-to-turn-your-website-into-a-pwa/
*
* The latest update however is based on
* https://serviceworke.rs/strategy-cache-and-update_service-worker_doc.html
*/

/*jshint esversion: 6 */

const CACHE = "page";

self.addEventListener("install", event => {
	event.waitUntil(precache());
});

self.addEventListener("fetch", event => {
	event.respondWith(fromCache(event.request).catch(() => fromCache("./")));
	event.waitUntil(update(event.request));
});

function precache() {
	return caches.open(CACHE).then(cache => cache.addAll([
			"./",
			"./photo.jpg"
		])
	);
}

function fromCache(request) {
	return caches.open(CACHE).then(cache => cache.match(request).then(match => match || Promise.reject("no-match")));
}

function update(request) {
	return caches.open(CACHE).then(cache => fetch(request).then(response => cache.put(request, response)));
}
