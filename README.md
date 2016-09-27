
# [PostCSS Prefix Wrap](https://github.com/dbtedman/postcss-prefixwrap) `v0.0.2` [![Build Status](https://travis-ci.org/dbtedman/postcss-prefixwrap.svg?branch=master)](https://travis-ci.org/dbtedman/estoolbox) [![NPM Version](https://img.shields.io/npm/v/postcss-prefixwrap.svg)](https://www.npmjs.com/package/postcss-prefixwrap)

A [PostCSS](http://postcss.org) plugin that is used to wrap css styles with a css selector to constrain their affect on parent elements in a page. It is for use when embedding an html interface inside an application container you do not control. Alternatively it can be used when there are multple deployments for your application and only a subset require embedding in an application you do not control.

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
