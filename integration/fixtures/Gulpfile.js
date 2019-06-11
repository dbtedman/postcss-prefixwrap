const Gulp = require("gulp");
const PostCSS = require("gulp-postcss");
const FSExtra = require("fs-extra");

// The require for PostCSS Prefix Wrap.
const PrefixWrap = require("../../src/main");

Gulp.task("css", done => {
  // Ensure clean from last run.
  FSExtra.remove("../.temp", () => {
    const processors = [PrefixWrap(".my-custom-wrap")];

    return Gulp
      .src("./css/raw/*.css")
      .pipe(PostCSS(processors))
      .pipe(Gulp.dest("../.temp"))
      .on("end", function() {
        done();
      });
  });
});
