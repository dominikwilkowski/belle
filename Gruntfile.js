'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                ██████╗  ███████╗ ██╗      ██╗      ███████╗
//                                                ██╔══██╗ ██╔════╝ ██║      ██║      ██╔════╝
//                                                ██████╔╝ █████╗   ██║      ██║      █████╗
//                                                ██╔══██╗ ██╔══╝   ██║      ██║      ██╔══╝
//                                                ██████╔╝ ███████╗ ███████╗ ███████╗ ███████╗
//                                                ╚═════╝  ╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝
//                                                               Created by Dominik Wilkowski
// @desc     Belle website
// @author   Dominik Wilkowski
// @website  https://github.com/dominikwilkowski/belle
// @issues   https://github.com/dominikwilkowski/belle/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Settings
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//define global settings
var SETTINGS = function() {
	return {
		'folder': {
			'js': 'source/js',
			'less': 'source/less',
			'svgs': 'source/svgs',

			'prod': 'prod/',
			'assets': 'assets',

			'PackageJSON': 'package.json',
		},
	};
};

//get custom selectors file for grunticon
var getSVGSelectors = function( grunt ) {
	try {
		var settings = SETTINGS();
		return grunt.file.readJSON( settings.folder.svgs + '/grunticon.json'); //see if there is a grunticon.json
	}
	catch(e) {
		return []; //otherwise return nuthin'
	}
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-wakeup');
	grunt.loadNpmTasks('grunt-font');


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Custom grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Default grunt tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.initConfig({


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Package content
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		SETTINGS: SETTINGS(),
		pkg: grunt.file.readJSON( SETTINGS().folder.PackageJSON ),


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean grunticon output
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			grunticon: [
				'<%= SETTINGS.folder.assets %>/css/grunticon.loader.js',
				'<%= SETTINGS.folder.assets %>/css/preview.html',
				'<%= SETTINGS.folder.assets %>/css/png/',
				'<%= SETTINGS.folder.assets %>/css/temp.data.png.css',
				'<%= SETTINGS.folder.assets %>/css/temp.data.svg.css',
				'<%= SETTINGS.folder.assets %>/css/temp.fallback.css',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Compile less to CSS
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		less: {
			belle: {
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
					plugins : [ new (require('less-plugin-autoprefix'))({ browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'ie 10' ] }) ],
				},
				files: {
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/belle.min.css': '<%= SETTINGS.folder.less %>/belle.less',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify js
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				mangle: false,
				report: 'gzip',
			},

			belle: {
				files: {
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/js/belle.min.js': [
						'<%= SETTINGS.folder.js %>/*.js',
						'!<%= SETTINGS.folder.js %>/*jquery*.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Concat js jquery files into the belle.min.js
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			js: {
				files: {
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/js/belle.min.js': [
						'<%= SETTINGS.folder.js %>/*jquery*.js',
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/js/belle.min.js',
					],
				},
			},

			grunticon: {
				files: {
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.data.svg.css': [
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.data.svg.css',
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/temp.data.svg.css',
					],
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.data.png.css': [
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.data.png.css',
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/temp.data.png.css',
					],
					'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.fallback.css': [
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/symbols.fallback.css',
						'<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css/temp.fallback.css',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Grunticon task for svgs
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			svg: {
				files: [{
					expand: true,
					cwd: '<%= SETTINGS.folder.svgs %>',
					src: '*.svg',
					dest: '<%= SETTINGS.folder.prod %>/<%= SETTINGS.folder.assets %>/css',
				}],

				options: {
					datasvgcss: 'temp.data.svg.css',
					datapngcss: 'temp.data.png.css',
					urlpngcss: 'temp.fallback.css',
					cssprefix: '.custom-',
					pngpath: '../img',
					enhanceSVG: true,
					customselectors: function() {
						return getSVGSelectors( grunt ); //get custom selectors from the file
					}( grunt ),
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy all grunticon fallback pngs to img folder
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			grunticon: {
				files: [{
					cwd: '<%= SETTINGS.folder.assets %>/css/png/',
					src: ['**/*.png'],
					dest: '<%= SETTINGS.folder.assets %>/img/',
					filter: 'isFile',
					expand: true,
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banners
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				maxLength: 11,
				colors: ['white', 'gray'],
			},

			title: {
				text: '| belle',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
					notifications: true,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Watch
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			js: {
				files: [
					'<%= SETTINGS.folder.js %>/**/*.js',
				],
				tasks: [
					'_js',
					'wakeup',
				],
			},

			less: {
				files: [
					'<%= SETTINGS.folder.less %>/**/*.less',
				],
				tasks: [
					'_less',
					'wakeup',
				],
			},

			svg: {
				files: [
					'<%= SETTINGS.folder.svgs %>/*.svg',
				],
				tasks: [
					'_svg',
					'wakeup',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					hostname: '127.0.0.1',
					port: 8888,
					directory: '<%= SETTINGS.folder.prod %>',
					base: '<%= SETTINGS.folder.prod %>',
				},
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Private tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('_less', [
		'less',
	]);

	grunt.registerTask('_js', [
		'uglify',
		'concat:js',
	]);

	grunt.registerTask('_svg', [
		'grunticon',
		'concat:grunticon',
		'copy',
		'clean',
	]);

	grunt.registerTask('_build', [
		'font',
		'_less',
		'_js',
		'_svg',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [ //run build with watch
		'_build',
		'connect',
		'watch',
	]);

	grunt.registerTask('build', [ //just build
		'_build',
		'wakeup',
	]);

	grunt.registerTask('server', [ //just start server and watch
		'connect',
		'watch',
		'wakeup',
	]);

};