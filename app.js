/*jshint node: true */
"use strict";

// Read configuration
var data = require(require("path").join(__dirname, "config.js"))("express");
var port = process.env.PORT || data.pkg.config.port || 8080;
var dir = data.pkg.config.paths;

// Application
var app = require("express")();
app.set("port", port);
app.use(function (req, res, next) {
	console.log(req.method, req.path);
	next();
});
app.locals.basedir = dir.views;
app.use(require("serve-static")(dir.public, {index: false}));
app.set("views", dir.views);
app.set("view engine", "jade");
app.use(function (req, res) {
	if (req.method !== "GET") {
		res.status(501).json({ notImplemented: req.method });
	} else {
		var status = data.pages[req.path] ? 200 : 404;
		data.path = status === 404 ? "/404" : req.path;
		res.status(status).render("index", data);
	}
});

// Http server
require("http").createServer(app).listen(port, function () {
	console.info("Express server listening on port %d", port);
});
