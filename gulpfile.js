'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// define a variable that BrowserSync uses in it's function
var bs;
// command for reloading webpages using BrowserSync
var reload = browserSync.reload;

gulp.task('start-metalsmith', function () {
  var started = false;

  return $.nodemon({
    script: 'index.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('start-browserSync',['start-metalsmith'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: 'build'
    }
  });
});

// Watch content and templates to rebuild on change
gulp.task('watch', function () {
  gulp.watch(['build/stylesheets/*.css', 'build/javascripts/**/*.js'], reload);
  gulp.watch(['build/**/*.html'], reload);
});

// Default task to start site and serve it
gulp.task('default', ['start-browserSync', 'watch']);
