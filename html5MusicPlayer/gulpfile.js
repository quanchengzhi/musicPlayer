const gulp = require("gulp");
const connect = require("gulp-connect");
const less = require("gulp-less");
//转移html文件
gulp.task("copy-html", function() {
        return gulp.src("./src/index.html")
            .pipe(connect.reload())
            .pipe(gulp.dest("./dist"));
    })
    //转移img
gulp.task("copy-img", function() {
        return gulp.src("./src/img/*.png")
            .pipe(gulp.dest("./dist/img"));
    })
    //转移js
gulp.task("copy-js", function() {
        return gulp.src("./src/js/*.js")
            .pipe(connect.reload())
            .pipe(gulp.dest("./dist/js"));
    })
    //监听任务
gulp.task("watch", function() {
        gulp.watch("./src/index.html", gulp.parallel('copy-html'));
        gulp.watch("./src/css/*.less", gulp.parallel('less'));
        gulp.watch("./src/js/*.js", gulp.parallel('copy-js'));
    })
    //开服务器
gulp.task("server", function() {
        connect.server({
            port: 8090,
            livereload: true,
            host: '::'
        });
    })
    //less换成css
gulp.task("less", function() {
    return gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest("./dist/css"));
})
gulp.task("build", gulp.parallel('copy-html', 'watch', 'server', 'less', 'copy-img', 'copy-js'));