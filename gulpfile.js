const gulp = require('gulp');
const bs = require('browser-sync').create(); // create a browser sync instance.
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
// const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
// const autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', ['css', 'js'],function() {
    bs.init({
        server: {
            baseDir: "./"
        },
        // proxy: "localhost:8080" // makes a proxy for localhost:8080
    });
});

gulp.task('watch', ['browser-sync'], function () {
    // gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("index.html").on('change', bs.reload);
    gulp.watch(["*.js", '!gulpfile.js'], ['js']);
    gulp.watch(["scss/*.s{a,c}ss"], ['css']);
});

gulp.task('css', () => {
    bs.reload();
    return gulp.src('./scss/**/*.*')
        .pipe(plumber())
        .pipe(sassLint())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sassLint.format())
        // .pipe(autoprefixer())
        .pipe(gulp.dest('demo/css'));
  });

gulp.task('js', () => {
    bs.reload();
    return gulp.src(['*.js', '!_*.js', '!gulpfile.js'])
        .pipe(plumber())
        // .pipe(concat('concat.js'))
        .pipe(babel({
            "presets": [
                "env",
                "babel-preset-stage-3"
            ]
        }))
        .pipe(gulp.dest('demo/js'));
});
