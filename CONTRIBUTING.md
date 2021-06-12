# [PostCSS Prefix Wrap](./README.md) // Contributing

Outlines how to contribute to the development of PostCSS Prefix Wrap.

-   [Core Maintainers](#core-maintainers)
-   [Thanks](#thanks)
-   [Continuous Integration](#continuous-integration)
-   [Code Formatting](#code-formatting)
-   [Test](#test)
-   [Publishing](#publishing)

## Core Maintainers

-   [Daniel Tedman](https://github.com/dbtedman)

## Thanks

Thanks to all of the [Contributors](https://github.com/dbtedman/postcss-prefixwrap/graphs/contributors) who maintain PostCSS Prefix Wrap and [Jeff Teng](https://github.com/aj120426394) for contributing to the initial design.

## Continuous Integration

Provided by [GitHub Actions](https://github.com/dbtedman/postcss-prefixwrap/actions?workflow=Test), run on every commit and pull request.

## Code Formatting

Code formatting support provided by [Prettier](https://prettier.io/).

```bash
yarn format
```

## Test

Tested using [Jest](https://jestjs.io/), using test cases defined in the `src/` directory matching `*.spec.ts` pattern.

```bash
yarn test
```

## Publishing

> Publishing new releases is completed by the [Core Maintainers](#core-maintainers).

Update `CHANGELOG.md` and `package.json` with details on the updated release version.

Then [Publish a new release](https://github.com/dbtedman/postcss-prefixwrap/releases/new) to trigger publishing a new version of this package.
