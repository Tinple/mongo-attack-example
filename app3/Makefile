NODE_MODULES = node_modules
POC ?= payload.js

test: install
	@node $(POC)

install: package.json
	@npm install

clean:
	@rm -rf $(NODE_MODULES)

.PHONY: clean test