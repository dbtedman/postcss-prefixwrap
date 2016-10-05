
# [PostCSS Prefix Wrap](https://github.com/dbtedman/postcss-prefixwrap) `v0.2.0` [![Build Status](https://travis-ci.org/dbtedman/postcss-prefixwrap.svg?branch=master)](https://travis-ci.org/dbtedman/postcss-prefixwrap) [![NPM Version](https://img.shields.io/npm/v/postcss-prefixwrap.svg)](https://www.npmjs.com/package/postcss-prefixwrap)

A [PostCSS](http://postcss.org) plugin that is used to wrap css styles with a css selector to constrain their affect on parent elements in a page.

## Dependencies

* [Node (v6)](https://nodejs.org)
* [NPM (v3)](https://www.npmjs.com)

## Contributors

* [Daniel Tedman](http://danieltedman.com)
* Jeff Teng

## Getting Started

0\. Ensure all [Dependencies](#dependencies) have been resolved.

1\. Install the Node module:

```
npm install --save-dev postcss-prefixwrap
```

2\. Load the module in your build configuration:

```javascript
var prefixwrap = require("postcss-prefixwrap");
```

3\. Instantiate the [PostCSS](http://postcss.org) plugin:

```javascript
// This will be a class on the container div.
var wrapSelector = ".my-custom-wrap";

// Postcss config for some workflow such as webpack.
{
  postcss: [
    prefixwrap(wrapSelector)
  ]
}
```

4\. Add the container to your markup:

```html
<div class="my-custom-wrap">
<!-- Your existing markup. -->
</div>
```

5\. Your css will now be contained:

```css
/* Before */

p {
  color: red;
}

body {
  font-size: 16px;
}
```

```css
/* After */

.my-custom-wrap p {
  color: red;
}

.my-custom-wrap {
  font-size: 16px;
}
```

## Testing

See [https://travis-ci.org/dbtedman/postcss-prefixwrap](https://travis-ci.org/dbtedman/postcss-prefixwrap) for CI results, run on each commit.

### Static Analysis

Code is linted using [ESLint](http://eslint.org):

```bash
npm run test:lint
```

### Unit Tests

Code is unit tested using [MochaJS](https://mochajs.org).

```bash
npm run test:unit
```

## Releasing

Based on the [NPM Publishing Guide](https://docs.npmjs.com/getting-started/publishing-npm-packages), after updating the current version, run the following command:

```
npm publish
```
