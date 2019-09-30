const gulp              = require('gulp');
const autoprefixer      = require('gulp-autoprefixer');
const browserSync       = require('browser-sync').create();
const sass              = require('gulp-sass');
const imagemin          = require('gulp-imagemin');
const nunjucksRender    = require('gulp-nunjucks-render');
const siteOutput        = './build';

const inputMain         = './src/sass/main.sass';
const output            = siteOutput + '/css/';
const inputTemplates    = './src/pages/*.html';
const sassOptions       = { outputStyle: 'compressed' };
const scriptFiles       = './src/js/*.js'

//
// sass
//

gulp.task('styles', () => {
    return gulp
        .src(inputMain)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
        .pipe(browserSync.stream());
});

//
// js
//

gulp.task('scripts', () => {
    return gulp
        .src(scriptFiles)
        .pipe(gulp.dest(siteOutput + '/js/'))
        .pipe(browserSync.stream());
});

//
// nunjucks
//

gulp.task('nunjucks', () => {
    nunjucksRender.nunjucks.configure(['./src/templates/']);
    return gulp
        .src(inputTemplates)
        .pipe(nunjucksRender())
        .pipe(gulp.dest(siteOutput))
});

//
// img
//

gulp.task('img', () => {
    return gulp
        .src('./src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(siteOutput + '/img'));
});

//
// watch 
//
  
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: siteOutput
        }
    });
    gulp.watch('./src/sass/**/*.sass', gulp.series('styles'))
    gulp.watch('./src/img/**/*', gulp.series('img'))
    gulp.watch('./src/js/*.js', gulp.series('scripts'))
    gulp.watch(inputTemplates, gulp.series('nunjucks')).on('change', browserSync.reload);
});
  
//
// Default
//

gulp.task('default', gulp.series('nunjucks', 'styles', 'scripts', 'img', 'watch'));