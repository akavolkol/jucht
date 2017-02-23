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

build-prod:
	npm run build
