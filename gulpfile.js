const gulp = require('gulp');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');

const DEBUG = true;

function watchPug(cb, ignoreInitial) {
    'use strict';
    let pug_obj = pug({
        basedir: 'src',
        doctype: 'html',
        pretty: DEBUG,
        self: true,
        cache: false
    }).on('error', function (error) {
        console.log(error);
        watchPug(cb, true);
    });

    return watch('src/**/*.pug', {ignoreInitial: ignoreInitial}).pipe(pug_obj).pipe(gulp.dest('dist'));

}

function watchStylus(cb, ignoreInitial = false) {
    let styl_obj = stylus({
        include: 'src',
        import: 'src/stylus-import'
    }).on('error', function (error) {
        console.log(error);
        watchStylus(cb, true);
    });

    return watch('src/**/*.styl', {ignoreInitial: ignoreInitial}).pipe(styl_obj).pipe(gulp.dest('dist'));
}

gulp.task('watch-stylus', watchStylus);
gulp.task('watch-pug', watchPug);

gulp.task('default', ['watch-pug', 'watch-stylus']);