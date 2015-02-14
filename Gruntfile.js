/*global grunt, module: false */

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		config: grunt.file.readJSON("settings.json"),

		// clean staging directory
		clean: {
			build: ["<%= config.paths.stage %>"]
		},

		// minify css
		cssmin: {
			css: {
				files: {
					'<%= config.paths.stage %>/style.min.css': ['static/style.css']
				}
			}
		},

		// jade compile
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					"<%= config.paths.dist %>/index.html": ["views/index.jade"],
					"<%= config.paths.dist %>/404.html": ["views/404.jade"]
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ["static/favicon.ico"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/photo.jpg"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/fusion.jpg"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/crossdomain.xml"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/browserconfig.xml"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/robots.txt"], dest: "<%= config.paths.dist %>/"},
					{src: ["LICENSE"], dest: "<%= config.paths.dist %>/"}
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
