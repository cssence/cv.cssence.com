module.exports = function () {
	"use strict";
	var path = require("path");
	var fs = require("fs");

	var pkg = require(path.join(__dirname, "package.json"));
	var manifest = require(path.join(__dirname, "public", "manifest.json"));
	var bookmarks = require(path.join(__dirname, "public", "bookmarks.json"));

	bookmarks.forEach(function (bookmark) {
		bookmark.id = bookmark.icon.split("-")[1].split(".")[0];
		bookmark.iconRaw = fs.readFileSync(path.join(__dirname, "public", bookmark.icon.split(pkg.homepage)[1]), "utf8");
		if (bookmark.url === pkg.homepage) {
			bookmark.rel = "home";
			bookmark.className = "print";
		} else if (bookmark.icon.indexOf("cssence") !== -1) {
			bookmark.rel = "me";
		}
	});

	var downloads = [
		{title: "Résumé", type: "application/pdf", href: "/downloads/cv_matthias-beitl_2018-12.pdf"},
		{title: "vCard", type: "text/vcard", href: "/downloads/matthias-beitl.vcf"}
	];
	downloads.forEach(function (download) {
		if (download.type === "text/vcard") {
			var content = fs.readFileSync(path.join(__dirname, "public", download.href));
			download.src = "data:text/vcard;charset=utf-8," + encodeURIComponent(new Buffer(content).toString());
		}
	});
	
	var pages = {
		"/": {},
		"/404": {noindex: "<i>404</i> Page not found"}
	};

	return {
		pages: pages,
		downloads: downloads,
		manifest: manifest,
		bookmarks: bookmarks,
		homepage: pkg.homepage
	};
};
