var gulp = require('gulp'),
    exec = require('child_process').exec,
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer')

gulp.task('styles', function() {
  return sass('assets/scss')
    .pipe(autoprefix({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('concatStyles', function() {
  gulp.src('assets/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('assets'))
})

gulp.task('templates', function(cb) {
  exec('handlebars templates/ -f js/templates/precompiled_templates.js', function(err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('default', function() {
  console.log('Warning: If you have made changes to any templates/styles before running this, you must run them manually.')
  gulp.watch('assets/scss/**/*.scss', ['styles'])
  gulp.watch('assets/css/**/*.css', ['concatStyles'])
  gulp.watch('templates/**/*.handlebars', ['templates'])
})