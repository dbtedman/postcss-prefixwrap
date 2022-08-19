.DEFAULT_GOAL := all

.PHONY: all
all: install lint test build

.PHONY: install
install:
	@pnpm install

.PHONY: lint
lint:
	@pnpm run lint

.PHONY: format
format:
	@pnpm run format

.PHONY: build
build:
	@pnpm run clean && pnpm run build

.PHONY: test
test:
	@pnpm run test

.PHONY: publish
publish:
	@pnpm publish --no-git-checks

.PHONY: local_publish
local_publish:
	@pnpm run build && pnpm pack && tar -xvzf postcss-prefixwrap*.tgz && rm postcss-prefixwrap*.tgz

.PHONY: local_cleanup
local_cleanup:
	@rm -rf ./package

.PHONY: upgrade
upgrade:
	@pnpm dlx npm-check-updates --reject postcss7 -u && pnpm upgrade
