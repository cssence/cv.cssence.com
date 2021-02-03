/**
* Service Worker
*
* Shoutout to @adactio, @jaffathecake and @mxbck, as this was based on
* https://gist.github.com/adactio/fbaa3a5952774553f5e7,
* https://www.youtube.com/watch?v=qDJAz3IIq18 and
* https://mxb.at/blog/how-to-turn-your-website-into-a-pwa/
*
* The latest update however is based on
* https://serviceworke.rs/strategy-cache-and-update_service-worker_doc.html
*/

const CACHE = 'page';

self.addEventListener('install', event => {
	event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
	event.respondWith(fromCache(event.request).catch(() => fromCache('./')));
	event.waitUntil(update(event.request));
});

async function precache() {
	const cache = await caches.open(CACHE);
	return await cache.addAll([
		'./',
		'./photo.jpg'
	]);
}

async function fromCache(request) {
	const cache = await caches.open(CACHE);
	const match = await cache.match(request);
	return match || Promise.reject('no-match');
}

async function update(request) {
	const cache = await caches.open(CACHE);
	const response = await fetch(request);
	return await cache.put(request, response);
}
