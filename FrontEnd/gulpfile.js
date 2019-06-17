const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;


// gulp.task('css', function(){
//   gulp.src('./app/**/*.css')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

// gulp.task('js', function(){
//   gulp.src('./app/**/*.js')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });
//
// gulp.task('html', function(){
//   gulp.src('./app/**/*.html')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });
//
// gulp.task('ctrl.js', function(){
//   gulp.src('./app/**/*.ctrl.js')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });
//
// gulp.task('service.js', function(){
//   gulp.src('./app/**/*.service.js')
//     .pipe(gulp.dest('./dist/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });
//
// gulp.task('build', function(){
//   gulp.start(['css','js','html','ctrl.js','service.js']);
// });

gulp.task('browser-sync', function(){
  browserSync.init(null, {
    open: false,
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('start', function() {
  devMode = true;
  gulp.start(['browser-sync']);
  // gulp.watch(['./app/**/*.css'],['css']);
  // gulp.watch(['./app/**/*.js'],['js']);
  // gulp.watch(['./app/**/*.ctrl.js'],['ctrl.js']);
  // gulp.watch(['./app/**/*.service.js'],['service.js']);
  // gulp.watch(['./app/**/*.html'],['html']);
});
