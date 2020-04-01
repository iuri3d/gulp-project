// Initialize modules
const {src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

//File path variables
const files ={
    scssPath: 'css/**/*.scss',
    jsPath: 'js/**/*.js'
}

// Sass task
function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist'));
}
//JS task
function jsTask(){
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('dist'));
}

// Cachebusting task
const cbstring = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbstring))
        .pipe(dest('.'));
}

//Watch task
function watchTask(){
    watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

//Default task
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
);