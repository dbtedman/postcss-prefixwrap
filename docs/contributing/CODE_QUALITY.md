# [PostCSS Prefix Wrap](../../README.md) / [Contributing Guide](../../CONTRIBUTING.md) / Code Quality

-   [Continuous Integration](#continuous-integration)
-   [Code Formatting](#code-formatting)
-   [Static Analysis](#static-analysis)
-   [Unit Tests](#unit-tests)
-   [Integration Tests](#integration-tests)

## Continuous Integration

Provided by [Travis CI](https://travis-ci.org/dbtedman/postcss-prefixwrap), run on every commit and pull request.

## Code Formatting

Code formatting support provided by [Prettier](https://prettier.io/) and [ESLint](http://eslint.org/).

```bash
npm run format
```

## Static Analysis

Linting support provided by [ESLint](http://eslint.org/) based on rules defined in `.eslintrc.yml`.

```bash
npm run test:lint
```

## Unit Tests

Code is unit tested using [MochaJS](https://mochajs.org), using test cases defined in the `unit/` directory.

```bash
npm run test:unit
```

## Integration Tests

Code is integration tested using [MochaJS](https://mochajs.org), using test cases defined in the `integration/` directory.

```bash
npm run test:integration
```
