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

```shell
yarn format
```

Alternatively, you can check if the code is already formatted correctly by executing the lint job instead.

```shell
yarn lint
```

## Test

Tested using [Jest](https://jestjs.io/), using test cases defined in the `src/` directory matching `*.spec.ts` pattern.

```shell
yarn test
```

Our test suite contains the following kinds of tests:

-   **Unit** - Does each unit of code perform its intended purpose, and do we handle potential error cases correctly.
-   **Integration** - Can our plugin be loaded into PostCSS and then executed correctly.
-   **Acceptance** - Does our plugin perform the correct operations based on provided configuration.

## Publishing

> ⚠️ Publishing new releases can only be completed by the [Core Maintainers](#core-maintainers).

1. Update `CHANGELOG.md` and `package.json` with details on the updated release version.
2. Commit these changes, and merge them into master via a pull request.
3. Then [Publish a new release](https://github.com/dbtedman/postcss-prefixwrap/releases/new) to trigger publishing a new version of this package.
4. GitHub will then trigger the **release** pipeline to publish the release to NPM.
5. [Core Maintainers](#core-maintainers) will receive a notification from NPM when the package has been published.
