const gulp = require('gulp');
const bs = require('browser-sync').create(); // create a browser sync instance.
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
// const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('browser-sync', ['css', 'css:demo', 'js'],function() {
    bs.init({
        server: {
            baseDir: './'
        },
        startPath: 'demo',
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('demo/index.html').on('change', bs.reload);
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch(['src/scss/*.scss'], ['css', 'css:demo']);
});

gulp.task('css:demo', () => {
    bs.reload();
    return gulp.src('src/scss/demo.scss')
        .pipe(plumber())
        .pipe(sassLint())
        .pipe(sass().on('error', sass.logError))
        .pipe(sassLint.format())
        .pipe(autoprefixer())
        .pipe(gulp.dest('demo/css'));
});

gulp.task('css', () => {
    bs.reload();
    return gulp.src('src/scss/jquery.vamoose.scss')
        .pipe(plumber())
        .pipe(sassLint())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sassLint.format())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
    bs.reload();
    return gulp.src(['src/js/*.js'])
        .pipe(plumber())
        // .pipe(concat('concat.js'))
        .pipe(babel({
            'presets': [
                'env',
                'babel-preset-stage-3'
            ]
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/js'));;
});

gulp.task('gh-pages-preflight', ['css', 'css:demo', 'js'], (done) => {
    gulp.src('./demo/js/jquery.vamoose.js')
        .pipe(gulp.dest('./gh-page/js'));
    gulp.src('./demo/css/*.css')
        .pipe(gulp.dest('./gh-page/css'));
    gulp.src('./demo/index.html')
        .pipe(gulp.dest('./gh-page/'));
    done();
});
