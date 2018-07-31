const gulp = require('gulp');
const pug = require('gulp-pug-i18n');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');

const DEBUG = true;

function watchPug(cb, ignoreInitial = false) {
    let pug_obj = pug({
        i18n: {
            locales: 'lang/*.*',
            dest: 'public',
            namespace: 'Lang',
            filename: '{{lang}}/{{basename}}.html'
        },
        basedir: 'src',
        doctype: 'html',
        pretty: DEBUG,
        cache: false
    }).on('error', function (error) {
        console.log(error.message);
        watchPug(cb, true);
    });

    return watch('src/**/*.pug', {ignoreInitial: ignoreInitial}).pipe(pug_obj).pipe(gulp.dest('public'));

}

function watchStylus(cb, ignoreInitial = false) {
    let styl_obj = stylus({
        include: 'src'
    }).on('error', function (error) {
        console.log(error);
        watchStylus(cb, true);
    });

    return watch('src/**/*.styl', {ignoreInitial: ignoreInitial}).pipe(styl_obj).pipe(gulp.dest('public'));
}

gulp.task('watch-stylus', watchStylus);
gulp.task('watch-pug', watchPug);

gulp.task('default', ['watch-pug', 'watch-stylus']);