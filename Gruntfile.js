module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    // Project configuration.
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	"sphinx_plugin": {
	    xml: {
		options: {
		    sourceRoot: 'doc',
		    destDir: 'doc-out/xml',
		    builder: 'xml'
		}
	    },
	    html: {
		options: {
		    sourceRoot: 'doc',
		    destDir: 'doc-out/html',
		    builder: 'html'
		}
	    }
	},
	uglify: {
	    options: {
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    },
	    build: {
		src: 'src/<%= pkg.name %>.js',
		dest: 'build/<%= pkg.name %>.min.js'
	    }
	},
	"babel": {
	    options: {
		sourceMap: true
	    },
	    dist: {
		cwd: 'src',
		expand: true,
		src: ['**/*.js'],
		dest: 'lib',
	    },
	}
	
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sphinx-plugin');

    // Default task(s).
    grunt.registerTask('default', ["babel", 'uglify', 'sphinx_plugin:xml', 'sphinx_plugin:html']);

};

