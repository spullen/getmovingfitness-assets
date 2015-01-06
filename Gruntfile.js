module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },

    js_src_path: 'js',
    js_build_path: "dist/js",
    css_src_path: "css",
    css_build_path: "dist/css",
    images_src_path: "images",
    images_build_path: "dist/images",
    fonts_build_path: "dist/fonts",

    clean: ["dist"],

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['<%= images_src_path %>/*'], dest: '<%= images_build_path %>', filter: 'isFile'},
          {
            expand: true, 
            flatten: true, 
            src: ['bower_components/bootstrap/dist/fonts/*'],
            dest: '<%= fonts_build_path %>',
            filter: 'isFile'
          }
        ]
      }
    },

    concat: {
      options:{
        separator: ';'
      },
      js: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/jquery-ujs/src/rails.js',
          'bower_components/moment/moment.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
          '<%= js_src_path %>/application.js'
        ],
        dest: '<%= js_build_path %>/app.js'
      },
      css:{
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
          '<%= css_src_path %>/application.css',
          '<%= css_src_path %>/home.css'
        ],
        dest: '<%= css_build_path %>/app.css'   
      }
    },

    uglify: {
      my_target: {
        files: {
          '<%= js_build_path %>/app.min.js': ['<%= js_build_path %>/app.js']
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= css_build_path %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= css_build_path %>',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};