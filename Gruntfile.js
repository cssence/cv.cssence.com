/*global grunt, module: false */

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.file.defaultEncoding = "utf8";
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// clean staging directory
		clean: {
			build: ["build"]
		},

		// minify css
		cssmin: {
			css: {
				files: {
					'build/style.min.css': ['static/style.css']
				}
			}
		},

		// jade compile
		jade: {
			compile: {
				options: {
					data: {
						debug: false,
						data: (function () {
							var data, homeUrl = "http://matthias.beitl.net/";
							data = grunt.file.readJSON("public/bookmarks.json");
							data.forEach(function (bookmark) {
								bookmark.id = bookmark.url.split("/")[2].split(".").splice(-2)[0];
								bookmark.rel = bookmark.url === homeUrl ? "home" : "me";
								bookmark.iconSrc = grunt.file.read("public/" + bookmark.icon.split(homeUrl)[1]);
							});
							return data;
						}())
					}
				},
				files: {
					"public/index.html": ["views/index.jade"],
					"public/404.html": ["views/404.jade"]
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: [
						"static/browserconfig.xml",
						"static/favicon.ico",
						"static/fusion.jpg",
						"static/photo.jpg",
						"LICENSE"
					], dest: "public/"}
				]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask(
		"build",
		"Prepares project deployment (minification)",
		["clean:build", "cssmin:css"]
	);
	grunt.registerTask(
		"release",
		"Deploys the project (copy assets and generate HTML)",
		["clean:build", "cssmin:css", "jade:compile", "copy:assets"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
