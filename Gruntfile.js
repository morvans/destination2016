// Generated on 2014-07-21 using generator-angular 0.9.5
'use strict';

var webpackConfig = require("./webpack.compile.js");
var webpackDevServerConfig = require("./webpack.devserver.js");
webpackDevServerConfig.webpack = webpackConfig;

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };



  // Define the configuration for all the tasks
  grunt.initConfig({

    availabletasks: {           // task
      tasks: {}               // target
    },

    // Project settings
    yeoman: appConfig,


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle',
        reporterOutput: 'checkstyle.xml',
        force: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/{,*/}*',
            '!dist/.git*'
          ]
        }]
      },
    },


    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp}',
            'contents/**'
          ]
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },



    webpack: {
      options: webpackConfig,
      dev: {
        devtool: "sourcemap",
        debug: true
      }
    },
    "webpack-dev-server": {
      options: webpackDevServerConfig,
      start: {
        keepalive: true
      }
    }

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    grunt.task.run([
      'webpack-dev-server:start'
    ]);
  });

  grunt.registerTask('test', [
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'webpack',
    'copy:dist',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
