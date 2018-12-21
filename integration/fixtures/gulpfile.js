const gulp = require("gulp");
const postcss = require("gulp-postcss");
const fs = require("fs-extra");

// The require for PostCSS Prefix Wrap.
const prefixwrap = require("../../src/main");

gulp.task("css", done => {
  // Ensure clean from last run.
  fs.remove("../.temp", () => {
    const processors = [
      prefixwrap(".my-custom-wrap")
    ];

    return gulp.src("./css/raw/*.css")
      .pipe(postcss(processors))
      .pipe(gulp.dest("../.temp"))
      .on("end", function () {
        done();
      });
  });
});
