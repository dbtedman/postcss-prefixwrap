# [PostCSS Prefix Wrap](https://danieltedman.com/my-work/postcss-prefixwrap)

[![CI GitHub Pipeline](https://img.shields.io/github/workflow/status/dbtedman/postcss-prefixwrap/ci?style=for-the-badge&logo=github&label=ci)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/ci.yml?query=branch%3Amain)
[![SAST GitHub Pipeline](https://img.shields.io/github/workflow/status/dbtedman/postcss-prefixwrap/sast?style=for-the-badge&logo=github&label=sast)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/sast.yml)
[![Release GitHub Pipeline](https://img.shields.io/github/workflow/status/dbtedman/postcss-prefixwrap/release?style=for-the-badge&logo=github&label=release)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/release.yml)
[![NPM Downloads Per Week](https://img.shields.io/npm/dw/postcss-prefixwrap?color=blue&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/postcss-prefixwrap)

A [PostCSS](https://postcss.org) plugin which prepends a selector to CSS styles to constrain their effect on parent
elements in a page.

| Supports | Versions            |
| :------- | :------------------ |
| NodeJS   | `v14`, `v16`, `v17` |
| PostCSS  | `v7`, `v8`          |

-   [How to use this plugin?](#how-to-use-this-plugin)
-   [What options does it have?](#what-options-does-it-have)
-   [How to contribute?](#how-to-contribute)
-   [Is this project secure?](#is-this-project-secure)
-   [License](#license)

## How to use this plugin?

> ⚠️ These instructions are only for this plugin. See the [PostCSS](http://postcss.org) website for framework information.

### Install

| Package Manager                                           | Command                                                  |
| :-------------------------------------------------------- | :------------------------------------------------------- |
| [NPM](https://www.npmjs.com/package/postcss-prefixwrap)   | `npm install postcss-prefixwrap --save-dev --save-exact` |
| [PNPM](https://pnpm.io)                                   | `pnpm add postcss-prefixwrap --save-dev --save-exact`    |
| [Yarn](https://yarnpkg.com/en/package/postcss-prefixwrap) | `yarn add postcss-prefixwrap --dev --exact`              |

### Configure

Add to your [PostCSS](http://postcss.org) configuration.

```javascript
const PostCSS = require("gulp-postcss");
const PrefixWrap = require("postcss-prefixwrap");

PostCSS([PrefixWrap(".my-custom-wrap")]);
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

## What options does it have?

-   [Minimal](#minimal)
-   [Ignored Selectors](#ignored-selectors)
-   [Prefix Root Tags](#prefix-root-tags)
-   [File Whitelist](#file-whitelist)
-   [File Blacklist](#file-blacklist)
-   [Nesting](#nesting)

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

You may want root tags, like `body` and `html` to be converted to classes, then prefixed, this is enabled using
the `prefixRootTags` option.

```javascript
PrefixWrap(".my-container", {
    prefixRootTags: true,
});
```

With this option, a selector like `html` will be converted to `.my-container .html`, rather than the
default `.my-container`.

### File Whitelist

In certain scenarios, you may only want `PrefixWrap()` to wrap certain CSS files. This is done using the `whitelist`
option.

```javascript
PrefixWrap(".my-custom-wrap", {
    whitelist: ["editor.css"],
});
```

### File Blacklist

In certain scenarios, you may want `PrefixWrap()` to exclude certain CSS files. This is done using the `blacklist`
option.

> If `whitelist` option is also included, `blacklist` will be ignored.

```javascript
PrefixWrap(".my-custom-wrap", {
    blacklist: ["colours.css"],
});
```

### Nesting

When writing nested css rules, and using a plugin like [postcss-nested](https://www.npmjs.com/package/postcss-nested) to compile them, you will want to ensure that the nested selectors are not prefixed. This is done by defining the `nested` property and setting the value to the selector prefix being used to represent nesting, this is most likely going to be `"&"`.

```javascript
PrefixWrap(".my-custom-wrap", {
    nested: "&",
});
```

As an example, in the following CSS that contains nested selectors.

```scss
.demo {
    &--lite {
        color: red;
    }
}
```

**❌ Without** the `nested` configuration option defined:

```css
.my-custom-wrap .my-custom-wrap .demo--lite {
    color: red;
}
```

**✅ With** the `tested` configuration defined:

```css
.my-custom-wrap .demo--lite {
    color: red;
}
```

## How to contribute?

Read our [Contributing Guide](CONTRIBUTING.md) to learn more about how to contribute to this project.

## Is this project secure?

Read our [Security Guide](SECURITY.md) to learn how security is considered during the development and operation of this
plugin.

## License

The [MIT License](./LICENSE.md) is used by this project.
