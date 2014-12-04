/*global grunt, module: false */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// jade compile
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'public/index.html': ['views/index.jade'],
					'public/404.html': ['views/404.jade']
				}
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: 'public/',
				src: ['style.css'],
				dest: 'public/',
				ext: '.min.css'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask(
		'build',
		'Builds the project',
		['cssmin:minify', 'jade:compile']
	);
	grunt.registerTask(
		'minify',
		'Creates minified files (no HTML)',
		['cssmin:minify']
	);

	// Default task(s).
	grunt.registerTask('default', ['build']);

};
