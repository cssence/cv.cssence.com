module.exports = function (grunt) {
	"use strict";
	grunt.file.defaultEncoding = "utf8";

	var data = require("./config.js")("grunt");

	grunt.initConfig({

		// clean staging directory
		clean: {
			generated: ["docs/*.min.*", "docs/*.html"]
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
				cwd: "docs/",
				src: "*.css",
				dest: "docs/",
				ext: ".min.css"
			}
		},

		// minify js
		uglify: {
			scripts: {
				expand: true,
				cwd: "docs/",
				src: "*.js",
				dest: "docs/",
				ext: ".min.js"
			}
		},

		// jade compile
		jade: {
			compile: {
				options: {
					data: function (dest, src) {
						data.path = dest.slice("docs".length, -".html".length);
						if (/\/index$/.test(data.path)) {
							data.path = data.path.slice(0, -"index".length);
						}
						return data;
					}
				},
				files: {
					"docs/index.html": "views/index.jade",
					"docs/404.html": "views/index.jade"
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ["LICENSE"], dest: "docs/"}
				]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask(
		"build",
		"Prepares project deployment (minification)",
		["clean:generated", "postcss:styles"]
	);
	grunt.registerTask(
		"release",
		"Deploys the project (copy assets and generate HTML)",
		["build", "jade:compile", "copy:assets"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
