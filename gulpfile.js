"use strict";

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jadeLocals = {};
var path = {
  jade: ['demo/index.jade','demo/partials/**/*.jade'],
  style:['demo/sass/**/*.scss'],
  js:['demo/js/**/*.js'],
  dist:['demo/src/angular-*']
};


// browser-sync task for starting the server.
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./demo/"
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
});

gulp.plumbedSrc = function () {
  return gulp.src.apply(gulp, arguments)
    .pipe($.plumber());
};

gulp.task('jade', function () {
  var replace = {
      patterns: []
    },
    preprocess = {context: {NODE_ENV: "DEV"}};


  return gulp.plumbedSrc(path.jade[0])
    .pipe($.jade({
        pretty: true,
        locals: jadeLocals
      }
    ))
    .pipe($.preprocess(preprocess))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('sass', function () {
  return gulp.plumbedSrc(path.style)
    .pipe($.sass().on('error', swallowError))
    .pipe(gulp.dest('./demo/css'));
});

gulp.task('dist', function () {
  return gulp.plumbedSrc(path.dist)
    .pipe(gulp.dest('./dist'));
});


gulp.task('watch', function () {
  gulp.watch(path.jade, ['jade', reload]);
  gulp.watch(path.style, ['sass'], reload);
  gulp.watch(path.js, reload);
});

gulp.task('default', ['jade','sass','browser-sync', 'watch']);

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}
