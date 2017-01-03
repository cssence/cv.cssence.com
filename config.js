module.exports = function (environment) {
	"use strict";
	var path = require("path");
	var fs = require("fs");
	var verbose = environment !== "grunt";

	var pkg = require(path.join(__dirname, "package.json"));
	var assignIfNull = function (parent, key, value) { parent[key] = parent[key] || value; };
	assignIfNull(pkg, "config", {});
	assignIfNull(pkg.config, "port", 8080);
	assignIfNull(pkg.config, "paths", {});
	assignIfNull(pkg.config.paths, "views", path.join(__dirname, "views"));
	assignIfNull(pkg.config.paths, "public", path.join(__dirname, "public"));

	var manifest = require(path.join(pkg.config.paths.public, "manifest.json"));

	var bookmarks = require(path.join(pkg.config.paths.public, "bookmarks.json"));
	bookmarks.forEach(function (bookmark) {
		bookmark.id = bookmark.icon.split("-")[1].split(".")[0];
		bookmark.iconRaw = fs.readFileSync(path.join(pkg.config.paths.public, bookmark.icon.split(pkg.homepage)[1]), "utf8");
		if (bookmark.url === pkg.homepage) {
			bookmark.rel = "home";
		} else if (bookmark.icon.indexOf("cssence") !== -1) {
			bookmark.rel = "me";
		}
	});

	var downloads = [
		{title: "Résumé", type: "application/pdf", href: "/downloads/cv_matthias-beitl_2016-06.pdf"},
		{title: "vCard", type: "text/vcard", href: "/downloads/matthias-beitl.vcf"}
	];
	if (!verbose) {
		downloads.forEach(function (download) {
			if (download.type === "text/vcard") {
				var content = fs.readFileSync(path.join(pkg.config.paths.public, download.href));
				download.src = "data:text/vcard;charset=utf-8;base64," + new Buffer(content).toString("base64");
			}
		});
	}
	
	var pages = {
		"/": {},
		"/offline": { noindex: "You are <i>offline</i>"},
		"/404": { noindex: "<i>404</i> Page not found"}
	};

	return {
		pages: pages,
		downloads: downloads,
		manifest: manifest,
		bookmarks: bookmarks,
		pkg: pkg,
		verbose: verbose
	};
};
