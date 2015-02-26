.PHONY: test npm

npm:
	npm prune
	npm install

test:
	./node_modules/.bin/mocha test --recursive

cover:
	./node_modules/istanbul/lib/cli.js cover --include-all-sources node_modules/mocha/bin/_mocha test -- --recursive
