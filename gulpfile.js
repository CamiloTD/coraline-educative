const gulp = require('gulp');
const download = require('gulp-download');

gulp.task('get-require.kmi', () => download('https://raw.githubusercontent.com/camilotd/require.kmi/master/src/require.kmi.js').pipe(gulp.dest('public/kmi_modules')));
gulp.task('get-coraline-client', () => download('https://raw.githubusercontent.com/camilotd/coraline-client/master/src/coraline-client.js').pipe(gulp.dest('public/kmi_modules')));

gulp.task('init', ['get-require.kmi', 'get-coraline-client']);