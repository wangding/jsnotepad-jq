/* global module: true */
module.exports = function (grunt) {
  grunt.initConfig({
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      src: ['*.html', './com/**/*.html']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['css/*.css', './com/**/*.css']
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: ['./js/*.js', './com/**/*.js']
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: 'dist/index.html',
        dest: 'dist/index.html'
      }
    },
    imagemin: {
      files: {
        expand: true,
        src: ['./images/*.png'],
        dest: 'dist/'
      }
    },
    copy: {
      html: {
        src: './index.html',
        dest: './dist/index.html'
      }
    },
    concat: {
      js: {
        src: ['js/*.js', './com/**/*.js'],
        dest: 'dist/js/bundle.js'
      },
      css: {
        src: ['css/*.css', './com/**/*.css'],
        dest: 'dist/css/bundle.css'
      }
    },
    uglify: {
      'dist/js/bundle.min.js': 'dist/js/bundle.js'
    },
    cssmin: {
      'dist/css/bundle.min.css': 'dist/css/bundle.css'
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    clean: {
      end: ['dist/css/bundle.css', 'dist/js/bundle.js', '.tmp']
    }
  });

  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('lint', ['htmlhint', 'csslint', 'eslint']);
  grunt.registerTask('build', ['copy:html', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin', 'imagemin', 'clean:end']);
};
