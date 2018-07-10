'use strict';

require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


var input_scss = 'scss/*.scss';
var output_css = './';
var sourcemaps_paths = "sourcemaps";



var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compact'
        // outputStyle: 'compressed'expended compact
};

var autoprefixerOptions = {
    browsers: ['last 5 versions', '> 1%', 'Firefox ESR']
};


gulp.task('sass', function() {
    return gulp
        .src(input_scss)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write(sourcemaps_paths))
        .pipe(gulp.dest(output_css))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./'));
});


gulp.task('html', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass', 'html'], function() {

    browserSync.init({
        server: true
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html", ['html']);
    gulp.watch("*.js", ['html']);
});



gulp.task('default', ['serve']);
