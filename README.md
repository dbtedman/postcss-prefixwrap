# [PostCSS Prefix Wrap](https://github.com/dbtedman/postcss-prefixwrap)

[![GitHub Actions Status (test)](https://github.com/dbtedman/postcss-prefixwrap/workflows/Test/badge.svg)](https://github.com/dbtedman/postcss-prefixwrap/actions?workflow=Test)
[![Build Status](https://travis-ci.org/dbtedman/postcss-prefixwrap.svg?branch=master)](https://travis-ci.org/dbtedman/postcss-prefixwrap)
[![Known Vulnerabilities](https://snyk.io/test/github/dbtedman/postcss-prefixwrap/badge.svg)](https://snyk.io/test/github/dbtedman/postcss-prefixwrap)
[![Maintainability](https://api.codeclimate.com/v1/badges/fa0627fb4cfdc2a6dd04/maintainability)](https://codeclimate.com/github/dbtedman/postcss-prefixwrap/maintainability)
[![codecov](https://codecov.io/gh/dbtedman/postcss-prefixwrap/branch/master/graph/badge.svg)](https://codecov.io/gh/dbtedman/postcss-prefixwrap)

A [PostCSS](https://postcss.org) plugin which prepends a selector to CSS styles to constrain their effect on parent elements in a page.

## Where do I start?

> These instructions are only for this plugin. See the [PostCSS](http://postcss.org) website for framework information.

### Install

Using [Yarn](https://yarnpkg.com/en/package/postcss-prefixwrap)

```bash
yarn add postcss-prefixwrap --dev --exact
```

Using [NPM](https://www.npmjs.com/package/postcss-prefixwrap)

```bash
npm install postcss-prefixwrap --save-dev --save-exact
```

### Configure

Add to your [PostCSS](http://postcss.org) configuration.

```javascript
const Gulp = require("gulp");
const PostCSS = require("gulp-postcss");
const PrefixWrap = require("postcss-prefixwrap");

Gulp.task("css", () =>
    Gulp.src("./src/*.css")
        .pipe(PostCSS([PrefixWrap(".my-custom-wrap")]))
        .pipe(Gulp.dest("./dest"))
);
```

### Container

Add the container to your markup.

```html
<div class="my-custom-wrap"><!-- Your existing markup. --></div>
```

### View

View your CSS, now prefix-wrapped.

**Before**

```css
p {
    color: red;
}

body {
    font-size: 16px;
}
```

**After**

```css
.my-custom-wrap p {
    color: red;
}

.my-custom-wrap {
    font-size: 16px;
}
```

## Want to lean more?

-   See our [Contributing Guide](CONTRIBUTING.md) for details on how this repository is developed.
-   See our [Changelog](CHANGELOG.md) for details on which features, improvements, and bug fixes have been implemented
-   See our [License](LICENSE.md) for details on how you can use the code in this repository.
-   See our [Security Guide](SECURITY.md) for details on how security is considered.
