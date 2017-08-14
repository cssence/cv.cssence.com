module.exports = function (grunt) {
	"use strict";
	grunt.file.defaultEncoding = "utf8";

	var data = require("./config.js")();

	grunt.initConfig({

		// clean staging directory
		clean: {
			generated: ["public/*.min.*", "public/*.html"]
		},

		// prefix css
		postcss: {
			options: {
				processors: [
					require("autoprefixer")({ browsers: ["last 3 versions", "IE > 9"] }),
					require("cssnano")()
				]
			},
			styles: {
				expand: true,
				cwd: "public/",
				src: "*.css",
				dest: "public/",
				ext: ".min.css"
			}
		},

		// minify js
		uglify: {
			scripts: {
				expand: true,
				cwd: "public/",
				src: "*.js",
				dest: "public/",
				ext: ".min.js"
			}
		},

		// jade compile
		jade: {
			compile: {
				options: {
					data: function (dest, src) {
						data.path = dest.slice("public".length, -".html".length);
						if (/\/index$/.test(data.path)) {
							data.path = data.path.slice(0, -"index".length);
						}
						return data;
					}
				},
				files: {
					"public/index.html": "views/index.jade",
					"public/404.html": "views/index.jade"
				}
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jade");

	grunt.registerTask(
		"build",
		"Prepares project deployment (minification)",
		["clean:generated", "postcss:styles"]
	);
	grunt.registerTask(
		"release",
		"Deploys the project (copy assets and generate HTML)",
		["build", "jade:compile"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
