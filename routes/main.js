/*jslint nomen: true */
/*global require: false, __dirname: false, module: false */
(function () {
	"use strict";
	module.exports = {
		indexAction: function (isDev, title, error) {
			return function (req, res) {
				var	fs = require("fs"),
					path = require("path"),
					homeUrl = "http://matthias.beitl.net/",
					folder = "../public/",
					data = fs.readFileSync(path.join(__dirname, folder, "bookmarks.json"), "utf8");
				data = JSON.parse(data);
				data.forEach(function (bookmark) {
					bookmark.id = bookmark.url.split("/")[2].split(".").splice(-2)[0];
					bookmark.rel = bookmark.url === homeUrl ? "home" : "me";
					bookmark.iconSrc = fs.readFileSync(path.join(__dirname, folder, bookmark.icon.split(homeUrl)[1]), "utf8");
				});
				res.render(error ? "error" : "index", {
					verbose: isDev,
					title: title,
					data: data
				});
			};
		}
	};
}());
