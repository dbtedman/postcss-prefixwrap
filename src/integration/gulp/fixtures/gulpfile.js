// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require("gulp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcss = require("gulp-postcss");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const postCSSPrefixWrap = require(`${__dirname}/../../../../build/index`);

const css = () =>
  gulp
    .src(`${__dirname}/css/app.css`)
    .pipe(postcss([postCSSPrefixWrap(".my-custom-wrap")]))
    .pipe(gulp.dest(`${__dirname}/dist`));

gulp.task("default", gulp.series(css));
