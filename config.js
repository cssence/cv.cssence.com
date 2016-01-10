module.exports = function (environment) {
	"use strict";
	var path = require("path");
	var fs = require("fs");

	var pkg = require(path.join(__dirname, "package.json"));
	var assignIfNull = function (parent, key, value) { parent[key] = parent[key] || value; };
	assignIfNull(pkg, "config", {});
	assignIfNull(pkg.config, "port", 8080);
	assignIfNull(pkg.config, "paths", {});
	assignIfNull(pkg.config.paths, "views", path.join(__dirname, "views"));
	assignIfNull(pkg.config.paths, "public", path.join(__dirname, "public"));

	var bookmarks = require(path.join(pkg.config.paths.public, "bookmarks.json"));
	bookmarks.forEach(function (bookmark) {
		bookmark.id = bookmark.icon.split("-")[1].split(".")[0];
		bookmark.rel = bookmark.url === pkg.homepage ? "home" : "me";
		bookmark.iconRaw = fs.readFileSync(path.join(pkg.config.paths.public, bookmark.icon.split(pkg.homepage)[1]), "utf8");
	});

	return {
		bookmarks: bookmarks,
		pkg: pkg,
		verbose: environment !== "grunt"
	};
};
