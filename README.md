
# [PostCSS Prefix Wrap](https://github.com/dbtedman/postcss-prefixwrap) `v0.0.1` [![Build Status](https://travis-ci.org/dbtedman/postcss-prefixwrap.svg?branch=master)](https://travis-ci.org/dbtedman/estoolbox) [![NPM Version](https://img.shields.io/npm/v/postcss-prefixwrap.svg)](https://www.npmjs.com/package/postcss-prefixwrap)

A [PostCSS](http://postcss.org) plugin used to wrap css styles with a css selector used to constrain their affect on parent elements in a page for use when embedding an html interface inside an application container you do not control.

## Getting Started

1\. Install the Node module:

```
npm install postcss-prefixwrap
```

2\. Load the module in your build configuration:

```javascript
var prefixwrap = require("postcss-prefixwrap");
```

3\. Instantiate the postcss plugin:

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

4\. Add the container to your markup.

```html
<div class="my-custom-wrap">
<!-- Your existing markup. -->
</div>
```

## Testing

See [https://travis-ci.org/dbtedman/postcss-prefixwrap](https://travis-ci.org/dbtedman/postcss-prefixwrap) for CI results, run on each commit.

### Static Analysis

Code is linted using [ESLint](http://eslint.org):

```bash
npm run test:lint
```
