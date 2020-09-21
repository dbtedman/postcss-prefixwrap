# [PostCSS Prefix Wrap](https://danieltedman.com/my-work/postcss-prefixwrap)

✅ Supports PostCSS v7 or v8

[![CI Build Test](https://github.com/dbtedman/postcss-prefixwrap/workflows/build-test/badge.svg)](https://github.com/dbtedman/postcss-prefixwrap/actions?workflow=build-test)
[![Test Code Coverage](https://codecov.io/gh/dbtedman/postcss-prefixwrap/branch/master/graph/badge.svg)](https://codecov.io/gh/dbtedman/postcss-prefixwrap)
[![Package Downloads (Weekly)](https://badgen.net/npm/dw/postcss-prefixwrap?label=downloads&style=flat)](https://www.npmjs.com/package/postcss-prefixwrap)

A [PostCSS](https://postcss.org) plugin which prepends a selector to CSS styles to constrain their effect on parent elements in a page.

-   [How to use this plugin?](#how-to-use-this-plugin)
-   [What options does it have?](#what-options-does-it-have)
-   [How to contribute?](#how-to-contribute)
-   [Is this project secure?](#is-this-project-secure)
-   [How is the project structured?](#how-is-the-project-structured)
-   [License](#license)

## How to use this plugin?

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

#### With Gulp

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

#### With WebPack

```javascript
const PrefixWrap = require("postcss-prefixwrap");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [PrefixWrap(".my-custom-wrap")],
                        },
                    },
                ],
            },
        ],
    },
};
```

> Based on example from [https://webpack.js.org/loaders/postcss-loader/](https://webpack.js.org/loaders/postcss-loader/).

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

## What options does it have?

-   [Minimal](#minimal)
-   [Ignored Selectors](#ignored-selectors)
-   [Prefix Root Tags](#prefix-root-tags)
-   [File Whitelist](#file-whitelist)
-   [File Blacklist](#file-blacklist)

### Minimal

The minimal required configuration is the prefix selector, as shown in the above example.

```javascript
PrefixWrap(".my-custom-wrap");
```

### Ignored Selectors

You may want to exclude some selectors from being prefixed, this is enabled using the `ignoredSelectors` option.

```javascript
PrefixWrap(".my-custom-wrap", {
    ignoredSelectors: [":root", "#my-id", /^\.some-(.+)$/],
});
```

### Prefix Root Tags

You may want root tags, like `body` and `html` to be converted to classes, then prefixed, this is enabled using the `prefixRootTags` option.

```javascript
PrefixWrap(".my-container", {
    prefixRootTags: true,
});
```

With this option, a selector like `html` will be converted to `.my-container .html`, rather than the default `.my-container`.

### File Whitelist

In certain scenarios, you may only want `PrefixWrap()` to wrap certain CSS files. This is done using the `whitelist` option.

```javascript
PrefixWrap(".my-custom-wrap", {
    whitelist: ["editor.css"],
});
```

### File Blacklist

In certain scenarios, you may want `PrefixWrap()` to exclude certain CSS files. This is done using the `blacklist` option.

> If `whitelist` option is also included, `blacklist` will be ignored.

```javascript
PrefixWrap(".my-custom-wrap", {
    blacklist: ["colours.css"],
});
```

## How to contribute?

Read our [Contributing Guide](CONTRIBUTING.md) to learn more about how to contribute to this project.

## Is this project secure?

Read our [Security Guide](SECURITY.md) to learn how security is considered during the development and operation of this plugin.

## How is the project structured?

Read our [Architecture Document](ARCHITECTURE.md) to learn how this project is structured.

## License

The [MIT License](./LICENSE.md) is used by this project.
