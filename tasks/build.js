const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const order = require('gulp-order')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sequence = require('gulp-sequence')

gulp.task('font-build', () => {
  return gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./dist/css/fonts'))
})

gulp.task('scss-build', () => {
  return gulp.src('./src/scss/fresh-ui.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [ 'last 4 versions' ]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(sass({ outputStyle:'compressed' }))
    .pipe(rename({
      basename: 'fresh-ui',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('js-build', () => {
  return gulp.src('./src/js/*.js')
    .pipe(order([ 'common.js' ]))
    .pipe(concat('fresh-ui.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({
      basename: 'fresh-ui',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('clean-dist', () => {
  return gulp.src([ './dist' ], { read: false }).pipe(clean())
})

gulp.task('build', sequence([ 'clean-dist' ], [ 'font-build', 'js-build', 'scss-build' ]))