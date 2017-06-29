var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');



//gets the source and passes it to it's destination
gulp.task('sass', function(){
    return gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer(
        {
             browsers: ['last 2 versions'],
        }
    ))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});
gulp.task('production', function(){
    return gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer(
        {
            browsers: ['last 2 versions'],
        }
    ))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
});

gulp.task('browserSync', () => {
    browserSync.init({
        server:'.'
    });
});

//gulp watch syntax
gulp.task('watch', function(){
    ('scss/**/*.scss', ['sass']);
});

gulp.task('watch', ['browserSync'], function(){
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('index.html').reload;
});

gulp.task('default', ['sass', 'watch']);