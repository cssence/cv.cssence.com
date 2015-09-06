/*jslint node: true, nomen: true */
"use strict";

// Read configuration
var path = require("path");
var pkg = require("./package.json");
var assignIfNull = function (parent, key, value) { parent[key] = parent[key] || value; };
assignIfNull(pkg, "config", {});
assignIfNull(pkg.config, "port", 8080);
assignIfNull(pkg.config, "paths", {});
assignIfNull(pkg.config.paths, "views", path.join(__dirname, "views"));
assignIfNull(pkg.config.paths, "static", path.join(__dirname, "static"));
assignIfNull(pkg.config.paths, "public", path.join(__dirname, "public"));

// Data
var fs = require("fs");
var data = {};
data.bookmarks = JSON.parse(fs.readFileSync(path.join(pkg.config.paths.public, "bookmarks.json"), "utf8"));
data.bookmarks.forEach(function (bookmark) {
  bookmark.id = bookmark.title.toLowerCase();
  bookmark.rel = bookmark.url === pkg.homepage ? "home" : "me";
  bookmark.iconSrc = fs.readFileSync(path.join(pkg.config.paths.public, bookmark.icon.split(pkg.homepage)[1]), "utf8");
});

// Application
var app = require("express")();
app.set("port", pkg.config.paths.port);
app.locals.basedir = pkg.config.paths.views;
app.use(require("serve-static")(pkg.config.paths.static, {index: false}));
app.use(require("serve-static")(pkg.config.paths.public, {index: false}));
app.set("views", pkg.config.paths.views);
app.set("view engine", "jade");
app.use(function (req, res) { res.render(req.url === "/" ? "index" : "error", data); });

// Http server
require("http").createServer(app).listen(pkg.config.port, function () {
  console.info("Express server listening on port %d", pkg.config.port);
});
