# Changelog

Releases ordered so that the most recent are displayed at the top, with the currently being developed release at the top, labeled as **In Development**. This release will be given a number once it is ready to be released. Each release can contain both a **Features and Improvements** and **Bug Fixes** sections.

## In Development

### Features and Improvements

-   Project cleanup.
-   Include Current Node Versions in Testing [#30](https://github.com/dbtedman/postcss-prefixwrap/issues/30)
-   PostCSS Should be a Peer Dependency not Dependency [#28](https://github.com/dbtedman/postcss-prefixwrap/issues/28)
-   Use Modern JS (ES6+) [#29](https://github.com/dbtedman/postcss-prefixwrap/issues/29)
-   Prettier

## 1.3.0

### Features and Improvements

-   Implement a more robust `@keyframes` detection, preserving `from` and `to` inside `@keyframes`. [#22](https://github.com/dbtedman/postcss-prefixwrap/pull/22)

### Bug Fixes

-   Stop ESLint from searching for config files in parent folders. [#23](https://github.com/dbtedman/postcss-prefixwrap/pull/23)

## 1.2.0

### Features and Improvements

-   Add code coverage reporting to ensure all parts of the code are being exercised by the tests.
-   Additional test coverage to exercise error condition handling for invalid css.
-   Introduction of integration testing suite.

### Bug Fixes

-   Keyframe percentages are incorrectly prefixed. [#17](https://github.com/dbtedman/postcss-prefixwrap/issues/17)

## 1.1.3

### Bug Fixes

-   Selectors containing the word "body" or "html" treated as root. [#6](https://github.com/dbtedman/postcss-prefixwrap/issues/6)

## 1.1.2

### Bug Fixes

-   Support for multiline selectors.

## 1.1.1

### Features and Improvements

-   Updates to support disabling of html/body replacement.
-   Enable support for multiple selectors.

## 1.0.1

### Features and Improvements

-   Updates to README contents.

## 1.0.0

### Features and Improvements

-   Updated npm dependencies to explicitly define versions.

## 0.2.2

### Features and Improvements

-   Expanded ESLint coverage to validate test scripts.
-   Extracted contributor details into `CONTRIBUTING.md` file and simplified project `README.md`.

## 0.2.1

### Features and Improvements

-   Added test for our container selector matching existing selector.

## 0.2.0

### Features and Improvements

-   Added Mocha Unit tests.

## 0.1.0

### Features and Improvements

-   Add support for top level combined selectors containing our container class.

## 0.0.5

### Bug Fixes

-   Updated ignores to help npm.

## 0.0.4

### Features and Improvements

-   Initial repository scaffold.
-   Basic plugin implementation.
