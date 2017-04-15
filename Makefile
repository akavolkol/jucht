.PHONY: build clean

serve:
	nodemon app/server/app.js --exec "node_modules/.bin/babel-node"

runtime:
	npm run runtime

serve-prod:
	npm start

clean:
	rm -rf build/*

build:
	node tools/build.js

test:
	node_modules/mocha/bin/mocha app/client/tests/**/*.js app/server/tests/**/*.js --compilers js:babel-core/register

build-prod:
	npm run build

electron:
	node_modules/.bin/electron app/desktop
