var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require('gulp-nodemon');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('copy-files', function() {
    gulp.src('./public/**/*')
        .pipe(gulp.dest('./dist/public'));
    gulp.src('./views/**/*')
        .pipe(gulp.dest('./dist/views'));
});
gulp.task('watch-files', function() {
    gulp.watch('./views/**/*.pug', ['copy-files']);
});
gulp.task("ts", function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
gulp.task('watch-ts', function() {
    gulp.watch('./src/**/**.ts', ['ts']);
});

gulp.task('serve', ['copy-files', 'ts', 'watch-ts', 'watch-files'], function() {
    return nodemon({
            script: './bin/www',
        })
        .on('restart', function() {
            console.log('restarted');
        })
})
gulp.task('default', ['copy-files', 'ts', 'watch-files', 'watch-ts']);