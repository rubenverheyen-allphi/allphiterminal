const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

gulp.task('default', () => {
    return gulp.src('bin/Parser.js')
      .pipe(babel({
          presets: ['es2015', 'stage-3']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
})
