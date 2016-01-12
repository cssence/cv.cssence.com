/*jshint node: true */
"use strict";

// Read configuration
var data = require(require("path").join(__dirname, "config.js"))("express");
var port = data.pkg.config.port;
var dir = data.pkg.config.paths;

// Application
var app = require("express")();
app.set("port", port);
app.locals.basedir = dir.views;
app.use(require("serve-static")(dir.public, {index: false}));
app.set("views", dir.views);
app.set("view engine", "jade");
app.use(function (req, res) {
	var map = {
		"/": "vcard",
		"/cv": "cv"
	};
	data.path = req.path;
	res.render(map[req.path] || "404", data);
});

// Http server
require("http").createServer(app).listen(port, function () {
	console.info("Express server listening on port %d", port);
});
