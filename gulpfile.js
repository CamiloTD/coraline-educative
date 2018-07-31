const gulp = require('gulp');
const pug = require('gulp-pug-i18n');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');

const DEBUG = true;

gulp.task('build-stylus', () => {
    let styl_obj = stylus({
        include: 'src'
    })

    return gulp.src('src/**/*.styl').pipe(styl_obj).pipe(gulp.dest('public'));
});

gulp.task('build-pug', () => {
    let pug_obj = pug({
        i18n: {
            locales: 'src/lang/*.*',
            dest: 'public',
            namespace: 'Lang',
            filename: '{{lang}}/{{basename}}.html'
        },
        basedir: 'src',
        doctype: 'html',
        pretty: DEBUG,
        cache: false
    })

    return gulp.src(['src/**/*.pug', '!/includes/**/*.*']).pipe(pug_obj).pipe(gulp.dest('public'));
});

gulp.task('build-rest', () => gulp.src(['!src/**/*.pug', '!src/**/*.styl']).pipe(gulp.dest('public')));

gulp.task('build', ['build-pug', 'build-stylus', 'build-rest']);
gulp.task('watch', () => watch('src/**/*.*', { ignoreInitial: false }, () => gulp.start('build')));