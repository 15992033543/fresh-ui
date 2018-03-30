const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./tasks')
gulp.task('start-dev', [ 'dev' ])
gulp.task('start-build', [ 'build' ])