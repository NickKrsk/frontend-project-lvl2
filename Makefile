install-deps:
	npm install
installBabel:
	npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env
publish:
	npm publish --dry-run
start:
	npx babel-node src/bin/gendiff.js 'before.json' 'after.json'
link:
	npm link
test:
	npm test
testWatch:
	npx jest --watch
lint:
	npx eslint .
	