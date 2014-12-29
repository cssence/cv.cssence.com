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
					'<%= pkg.paths.dist %>/index.html': ['views/index.jade'],
					'<%= pkg.paths.dist %>/404.html': ['views/404.jade']
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ['static/favicon.ico'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/photo.jpg'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/fusion.jpg'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/crossdomain.xml'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/browserconfig.xml'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/robots.txt'], dest: '<%= pkg.paths.dist %>/'}
				]
			}
		},

		// clean staging directory
		clean: {
			build: ['<%= pkg.paths.stage %>']
		},

		// minify css
		cssmin: {
			minify: {
				expand: true,
				cwd: 'static/',
				src: ['style.css'],
				dest: '<%= pkg.paths.stage %>/',
				ext: '.min.css'
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask(
		'build',
		'Prepares project deployment (minification)',
		['clean:build', 'cssmin:minify']
	);
	grunt.registerTask(
		'release',
		'Deploys the project (copy assets and generate HTML)',
		['clean:build', 'cssmin:minify', 'jade:compile', 'copy:assets']
	);

	// Default task(s).
	grunt.registerTask('default', ['release']);

};
