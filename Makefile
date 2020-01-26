install:
	npm install
installBabel:
	npm install --save-dev @babel/core @babel/cli @babel/node @babel/preset-env
publish:
	npm publish --dry-run
start:
	npx babel-node src/bin/gendiff.js
link:
	npm link