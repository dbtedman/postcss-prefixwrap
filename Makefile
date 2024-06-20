.DEFAULT_GOAL := all

.PHONY: all
all: install lint build test

.PHONY: pre_commit
pre_commit: lint test_fast

.PHONY: install
install:
	@bun install

.PHONY: lint
lint:
	@bun run lint

.PHONY: format
format:
	@bun run format

.PHONY: build
build:
	@bun run clean && bun run build

.PHONY: test
test:
	@bun run test --coverage

.PHONY: test_fast
test_fast:
	@bun run test

# TODO: Fixme
.PHONY: publish
publish:
	@bun publish --no-git-checks

# TODO: Fixme
.PHONY: local_publish
local_publish:
	@bun run build && bun pack && tar -xvzf postcss-prefixwrap*.tgz && rm postcss-prefixwrap*.tgz

.PHONY: local_cleanup
local_cleanup:
	@rm -rf ./package

# TODO: Fixme
.PHONY: audit_signatures
audit_signatures:
	# Not yet available via pnpm as of 21/04/2024.
	npm audit signatures
