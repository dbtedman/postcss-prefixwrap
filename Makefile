.DEFAULT_GOAL := all

all: install lint test build

install:
	@pnpm install

lint:
	@pnpm run lint

format:
	@pnpm run format

build:
	@pnpm run clean && pnpm run build

test:
	@pnpm run test

publish:
	@pnpm publish

local_publish:
	@pnpm run build && pnpm pack && tar -xvzf postcss-prefixwrap*.tgz && rm postcss-prefixwrap*.tgz

local_cleanup:
	@rm -rf ./package
