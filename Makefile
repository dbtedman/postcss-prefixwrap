.DEFAULT_GOAL := all

.PHONY: all
all: install lint build test sast

.PHONY: pre_commit
pre_commit: lint test_fast

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
	@pnpm run test --coverage

.PHONY: test_fast
test_fast:
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
	@pnpm dlx npm-check-updates --interactive && pnpm upgrade

.PHONY: sast
sast: sast_snyk sast_osv

.PHONY: sast_snyk
sast_snyk:
	snyk test --all-projects --detection-depth=1

.PHONY: sast_osv
sast_osv:
	osv-scanner ./
