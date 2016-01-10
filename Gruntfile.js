module.exports = function (grunt) {
	"use strict";
	grunt.file.defaultEncoding = "utf8";

	var data = require("./config.js")("grunt");

	grunt.initConfig({

		// clean staging directory
		clean: {
			build: ["build"]
		},

		// prefix and minify css
		postcss: {
			options: {
				processors: [
					require("autoprefixer")(),
					require("cssnano")()
				]
			},
			styles: {
				files: {
					"build/style.min.css": ["static/style.css"]
				}
			}
		},

		// jade compile
		jade: {
			compile: {
				options: {
					data: data
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
					{expand: true, flatten: true, src: ["LICENSE"], dest: "public/"}
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
		["build", "jade:compile", "copy:assets"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
