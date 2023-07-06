const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('packages/**/dist/**/*.js').pipe(uglify()).pipe(gulp.dest('./packages'));
});
