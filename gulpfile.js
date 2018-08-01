const gulp = require('gulp');

gulp.task('get-require.kmi', () => download('https://raw.githubusercontent.com/camilotd/require.kmi/master/src/require.kmi.js').pipe(gulp.dest('public/kmi_modules')));
gulp.task('get-coraline-client', () => download('https://raw.githubusercontent.com/camilotd/coraline-client/master/src/coraline-client.js').pipe(gulp.dest('public/kmi_modules')));
gulp.task('get-jquery', () => download('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js').pipe(gulp.dest('public/kmi_modules')));
gulp.task('get-eventemitter', () => download('https://cdnjs.cloudflare.com/ajax/libs/EventEmitter/5.2.5/EventEmitter.min.js').pipe(gulp.dest('public/kmi_modules')));

gulp.task('init', ['get-require.kmi', 'get-coraline-client', 'get-jquery', 'get-eventemitter']);