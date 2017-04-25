.PHONY: build

serve:
	nodemon app/server/app.js --exec "node_modules/.bin/babel-node"

runtime:
	npm run runtime

build:
	node tools/build.js
		&& node tools/build.js desktop
		&& npm run build

test-prod:
	NOD_ENVIRONMENT=production npm run build && npm start

test:
	node_modules/mocha/bin/mocha app/client/tests/**/*.js app/server/tests/**/*.js --compilers js:babel-core/register

electron:
	node_modules/.bin/electron app/desktop

pack:
		node_modules/.bin/build --dir

release-desktop: build
	node_modules/.bin/build --linux && node_modules/.bin/build --win --ia32

release:
	git push heroku
