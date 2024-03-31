lint-frontend:
	make -C frontend lint

install:
	npm ci

install-deploy:
	npm ci
	cd frontend && npm ci && npm run build


start-frontend:
	make -C frontend start

start-backend:
	npx start-server --port 5000

deploy:
	git push heroku main

start:
	npm run start

develop:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build

deploy-build:
	cd ..
	rm frontend/build -rf
	npm run build

test:
	make -C frontend test