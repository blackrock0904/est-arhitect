const gulp = require("gulp");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass( dartSass );
const njkRender = require("gulp-nunjucks-render");
const prettify = require("gulp-html-prettify");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const connect = require("gulp-connect");

gulp.task("styles", () => {
    return gulp
        .src("src/styles/**/*.scss")
        .pipe(sass())
        // .pipe(autoprefixer())
        // .pipe(cssnano())
        .pipe(concat("styles.min.css"))
        .pipe(gulp.dest("gen/css"));
});

gulp.task("scripts", () => {
    return gulp
        .src("src/js/**/*.js")
        .pipe(uglify())
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest("gen/js"));
});

gulp.task("images", () => {
    return gulp
        .src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("gen/images"));
});

gulp.task('nunjucks', function() {
    return gulp.src('./*.njk')
        .pipe(njkRender())
        .pipe(prettify({
            indent_size : 4
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('pages', function() {
    return gulp.src('./src/templates/page/**/*.njk')
        .pipe(njkRender())
        .pipe(prettify({
            indent_size : 4
        }))
        .pipe(gulp.dest('./page'))
});

gulp.task("webserver", function() {
    connect.server({
        livereload: true
    });
});


gulp.task("watch", () => {
    gulp.watch("src/styles/**/*.scss", gulp.series("styles"));
    gulp.watch("src/js/**/*.js", gulp.series("scripts"));
    gulp.watch("src/images/**/*", gulp.series("images"));
    gulp.watch('./**/*.njk', gulp.series("nunjucks"));
    gulp.watch('./src/templates/**/*.njk', gulp.series("pages"));
    // gulp.watch('./gen/**/*.js', gulp.series("webserver"));

});



exports.default = gulp.series("styles", "scripts", "images", "nunjucks", "pages", "webserver", "watch");
