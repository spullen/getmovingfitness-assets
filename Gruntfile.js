module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    js_src_path: 'js',
    js_dist_path: 'dist/js',

    css_src_path: 'css',
    css_build_path: 'build/css',
    css_dist_path: 'dist/css',

    images_src_path: 'images',
    images_dist_path: 'dist/images',

    fonts_dist_path: 'dist/fonts',

    clean: ['dist'],

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['<%= images_src_path %>/*'], dest: '<%= images_dist_path %>', filter: 'isFile'},
          {
            expand: true, 
            flatten: true, 
            src: ['bower_components/bootstrap/dist/fonts/*'],
            dest: '<%= fonts_dist_path %>',
            filter: 'isFile'
          },
          {expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.css.map'], dest: '<%= css_dist_path %>', filter: 'isFile'}
        ]
      },
    },

    replace: {
      dev: {
        src: ['<%= css_src_path %>/home.css'],
        dest: '<%= css_build_path %>/home.css',
        replacements: [
          {
            from: ':host',
            to: 'http://localhost:9000'
          }
        ]
      },
      prod: {
        src: ['<%= css_src_path %>/home.css'],
        dest: '<%= css_build_path %>/home.css',
        replacements: [
          {
            from: ':host',
            to: '//assets.getmoving.fitness'
          }
        ]
      }
    },

    concat: {
      js: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/jquery-ujs/src/rails.js',
          'bower_components/moment/moment.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
          '<%= js_src_path %>/application.js'
        ],
        dest: '<%= js_dist_path %>/app.js'
      },
      css:{
        src: [
          'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
          '<%= css_src_path %>/application.css',
          '<%= css_build_path %>/home.css'
        ],
        dest: '<%= css_dist_path %>/app.css'   
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          '<%= js_dist_path %>/app.min.js': ['<%= js_dist_path %>/app.js']
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= css_dist_path %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= css_dist_path %>',
          ext: '.min.css'
        }]
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          keepalive: true,
          livereload: true
        }
      }
    },

    watch: {
      scripts: {
        files: [
          '<%= js_src_path %>/**/*.js',
          '<%= css_src_path %>/**/*.css',
          '<%= images_src_path %>/**/*.*'
        ],
        tasks: ['build-dev'],
        options: {
          spawn: false,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['build-dev', 'connect']);

  grunt.registerTask('build-dev', ['clean', 'copy', 'replace:dev', 'concat']);
  grunt.registerTask('build-prod', ['clean', 'copy', 'replace:prod', 'concat', 'uglify', 'cssmin']);
};