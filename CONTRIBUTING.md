
# Contributing Guide for PostCSS Prefix Wrap

## Testing and Code Quality

### Continuous Integration

* [Travis CI](https://travis-ci.org/dbtedman/postcss-prefixwrap) - Used for running the test suite on every commit.
* [Code Climate](https://codeclimate.com/github/dbtedman/postcss-prefixwrap) - Used for test coverage and maintainability analysis.

### Static Analysis

Linting support provided by [ESLint](http://eslint.org/) based on rules defined in `.eslintrc.yml`.

```bash
npm run test:lint
```

### Unit Tests

Code is unit tested using [MochaJS](https://mochajs.org), using test cases defined in the `test/` directory.

```bash
npm run test:unit
```

## Releasing

Based on the [NPM Publishing Guide](https://docs.npmjs.com/getting-started/publishing-npm-packages), after updating the current version, run the following command:

```bash
npm publish
```
