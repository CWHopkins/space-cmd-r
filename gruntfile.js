module.exports = function (grunt) {

	var i18n = ! grunt.option('DskipI18n'),
		lint = ! grunt.option('DskipLint');

	// Automagically load grunt tasks.
	require('load-grunt-config')(grunt, {
		config : {

			pkg     : grunt.file.readJSON('package.json'),

			jitgrun : true,

			target  : 'dist/',

		}
	});

	// Time how long tasks take.
	require('time-grunt')(grunt);

	grunt.registerTask('default', ['dev']);
	
};
