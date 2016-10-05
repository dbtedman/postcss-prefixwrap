
# Contributing

A guide for contributing to this repository which extends the [README.md](README.md) file. 

## Dependencies

* [Node (v6)](https://nodejs.org)
* [NPM (v3)](https://www.npmjs.com)

## Contributors

* [Daniel Tedman](http://danieltedman.com)
* Jeff Teng

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
