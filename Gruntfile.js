// var routes = require('./backend/routes.js');
var path = require('path');

module.exports = function(grunt) {
    // plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
          defaults: {
            options: {
              port: 9000,
              bases: path.resolve('index.html'),
              server: path.resolve('server'),
              serverreload: true
            }
          }
        },

        concat: {
          dist: {
              src: [
                  'js/*.js' 
              ],
              dest: './build.js',
          }
        },

        concat_css: {
          options: {
            
          },
          all: {
            src: ["./css/*.css"],
            dest: "./css/styles.css"
          },
        }

    });

    grunt.registerTask('default', ['concat', 'concat_css', 'express', 'watch','express-keepalive']);
};