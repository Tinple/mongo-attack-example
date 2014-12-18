NODE_MODULES = node_modules
INPUT ?= index.js
POC ?= payload.js

test: install
	@node $(INPUT) && node $(POC)

install: package.json
	@npm install

clean:
	@rm -rf $(NODE_MODULES)

.PHONY: clean test