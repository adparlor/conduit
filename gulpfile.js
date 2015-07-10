var gulp = require('gulp'),
    exec = require('child_process').exec,
    sass = require('gulp-ruby-sass')

gulp.task('styles', function() {
  return sass('assets/scss')
    .pipe(gulp.dest('assets/css'))
})

gulp.task('compile_styleguide', function() {
  return sass('assets/styleguide_scss/main.scss')
    .pipe(gulp.dest('assets/css'))
})

gulp.task('templates', function(cb) {
  exec('handlebars templates/ -f js/templates/precompiled_templates.js', function(err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('default', function() {
  gulp.watch('assets/scss/**/*.scss', ['styles'])
  gulp.watch('templates/**/*.handlebars', ['templates'])
})