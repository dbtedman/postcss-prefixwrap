var gulp = require("gulp");
var postcss = require("gulp-postcss");
var fs = require("fs-extra");
var prefixwrap = require("../../src/main"); // The require for PostCSS Prefix Wrap.

(function () {

  "use strict";

  gulp.task("css", function (done) {
    // Ensure clean from last run.
    fs.remove("../.temp", function () {
      var processors = [
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
})();
