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
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('jade', () => {
  gulp.src('./src/jade/*.jade')
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./dev/html'))
})

gulp.task('js', () => {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(order([ 'common.js' ]))
    .pipe(concat('fresh-ui.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dev/js'))
})

gulp.task('scss', () => {
  gulp.src('./src/scss/fresh-ui.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [ 'last 4 versions' ]
    }))
    .pipe(gulp.dest('./dev/css'))
})

gulp.task('font', () => {
  gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./dev/css/fonts'))
})

gulp.task('watch', () => {
  gulp.watch([ './src/jade/*.jade' ], [ 'jade' ]).on('change', reload)
  gulp.watch(['./src/scss/*.scss'], [ 'scss' ]).on('change', reload)
  gulp.watch(['./src/js/*.js'], ['js']).on('change', reload)
})

gulp.task('clean', () => {
  gulp.src([ './dev', './dist' ], { read: false }).pipe(clean())
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

gulp.task('font-build', () => {
  gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./dist/css/fonts'))
})

gulp.task('css-build', () => {
  gulp.src('./src/scss/fresh-ui.scss')
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
  gulp.src('./src/js/*.js')
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

gulp.task('dev', [ 'font', 'jade', 'js', 'scss', 'server', 'watch' ])

gulp.task('build', [ 'font-build', 'js-build', 'css-build'])
