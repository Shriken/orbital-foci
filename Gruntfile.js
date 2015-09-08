module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		browserify: {
			app: {
				options: {
					transform: [['babelify', { stage: 0 }]],
				},
				files: {
					'app.js': [
						'script.js',
					],
				},
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 4,
			},
			main: ['watch', 'shell:pythonServer'],
		},

		watch: {
			app: {
				files: [
					'script.js',
				],
				tasks: 'browserify',
				options: {
					interrupt: true,
				},
			},
		},

		shell: {
			pythonServer: {
				command: 'python -m SimpleHTTPServer',
			}
		},
	});

	grunt.registerTask('default', [
		'browserify',
		'concurrent',
	]);
};
