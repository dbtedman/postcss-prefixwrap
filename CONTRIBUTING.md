
# Contributing Guide

## Testing and Code Quality

### Continuous Integration

[Travis CI](https://travis-ci.org/dbtedman/postcss-prefixwrap)

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
