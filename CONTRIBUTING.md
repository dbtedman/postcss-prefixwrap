# [PostCSS Prefix Wrap](./README.md) // Contributing

Outlines how to contribute to the development of PostCSS Prefix Wrap.

-   [Core Maintainers](#core-maintainers)
-   [Thanks](#thanks)
-   [Continuous Integration](#continuous-integration)
-   [Code Formatting](#code-formatting)
-   [Test](#test)
-   [Publishing](#publishing)
-   [References](#references)

## Core Maintainers

-   [Daniel Tedman](https://github.com/dbtedman)

## Thanks

Thanks to all of the [Contributors](https://github.com/dbtedman/postcss-prefixwrap/graphs/contributors) who maintain
PostCSS Prefix Wrap and [Jeff Teng](https://github.com/aj120426394) for contributing to the initial design.

## Continuous Integration

[![CI GitHub Pipeline](https://img.shields.io/github/actions/workflow/status/dbtedman/postcss-prefixwrap/ci.yml?branch=main&style=for-the-badge&logo=github&label=ci)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/ci.yml?query=branch%3Amain)
[![SAST GitHub Pipeline](https://img.shields.io/github/actions/workflow/status/dbtedman/postcss-prefixwrap/sast.yml?branch=main&style=for-the-badge&logo=github&label=sast)](https://github.com/dbtedman/postcss-prefixwrap/actions/workflows/sast.yml)

Provided by [GitHub Actions](https://github.com/dbtedman/postcss-prefixwrap/actions?workflow=Test), run on every commit
and pull request.

## Code Formatting

Code formatting support provided by [Prettier](https://prettier.io/).

```shell
make format
```

Alternatively, you can check if the code is already formatted correctly by executing the lint job instead.

```shell
make lint
```

## Test

Tested using [Jest](https://jestjs.io/), using test cases defined in the `src/` directory matching `*.spec.ts` pattern.

```shell
make test
```

## Publishing

[![NPM Downloads Per Week](https://img.shields.io/npm/dw/postcss-prefixwrap?color=blue&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/postcss-prefixwrap)

> ⚠️ Publishing new releases can only be completed by the [Core Maintainers](#core-maintainers).

1. Update `CHANGELOG.md` and `package.json` with details on the updated release version.
2. Commit these changes, and merge them into main via a pull request.
3. Then [Publish a new release](https://github.com/dbtedman/postcss-prefixwrap/releases/new) to trigger publishing a new
   version of this package.
4. GitHub will then trigger the **release** pipeline to publish the release to NPM.
5. [Core Maintainers](#core-maintainers) will receive a notification from NPM when the package has been published.

## References

> 💡 Resources referenced during the development of this project.

-   [TypeScript: Node Target Mapping](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping) - To correctly configure TypeScript to compile JavaScript that works with our target NodeJS versions.
