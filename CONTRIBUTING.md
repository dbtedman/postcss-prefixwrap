# Contributing Guide

Thanks to all of the [Contributors](https://github.com/dbtedman/postcss-prefixwrap/graphs/contributors) who maintain PostCSS Prefix Wrap and [Jeff Teng](https://github.com/aj120426394) for contributing to the initial design.

## Testing and Code Quality

### Continuous Integration

Provided by [Travis CI](https://travis-ci.org/dbtedman/postcss-prefixwrap), run on every commit and pull request.

### Code Formatting

Code formatting support provided by [Prettier](https://prettier.io/) and [ESLint](http://eslint.org/).

```bash
npm run format
```

### Static Analysis

Linting support provided by [ESLint](http://eslint.org/) based on rules defined in `.eslintrc.yml`.

```bash
npm run test:lint
```

### Unit Tests

Code is unit tested using [MochaJS](https://mochajs.org), using test cases defined in the `unit/` directory.

```bash
npm run test:unit
```

### Integration Tests

Code is integration tested using [MochaJS](https://mochajs.org), using test cases defined in the `integration/` directory.

```bash
npm run test:integration
```

## Releasing

Based on the [NPM Publishing Guide](https://docs.npmjs.com/getting-started/publishing-npm-packages), after updating the current version, run the following command:

```bash
npm publish
```
