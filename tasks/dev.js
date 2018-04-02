const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const jade = require('gulp-jade')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const order = require('gulp-order')
const plumber = require('gulp-plumber')
const sequence = require('gulp-sequence')

gulp.task('jade-dev', () => {
  return gulp.src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dev/html'))
})

gulp.task('js-dev', () => {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(order([ 'common.js' ]))
    .pipe(concat('fresh-ui.js', { newLine: ';\r\n\r\n' })  )
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dev/js'))
})

gulp.task('scss-dev', () => {
  return gulp.src('./src/scss/fresh-ui.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [ 'last 4 versions' ]
    }))
    .pipe(gulp.dest('./dev/css'))
})

gulp.task('font-dev', () => {
  return gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./dev/css/fonts'))
})

gulp.task('clean-dev', () => {
  return gulp.src([ './dev' ], { read: false }).pipe(clean())
})

gulp.task('watch', () => {
  gulp.watch([ './src/jade/*.jade' ], [ 'jade-dev' ]).on('change', reload)
  gulp.watch(['./src/scss/*.scss'], [ 'scss-dev' ]).on('change', reload)
  gulp.watch(['./src/js/*.js'], ['js-dev']).on('change', reload)
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dev',
      index: 'html/index.html'
    },
    port: 3000
  })
})

gulp.task('dev', sequence([ 'clean-dev' ], [ 'font-dev', 'jade-dev', 'js-dev', 'scss-dev', 'server', 'watch' ]))