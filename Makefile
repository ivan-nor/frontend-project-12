lint-frontend:
	make -C frontend lint

install:
	npm ci && make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

build:
	cd frontend && npm run build

start:
	make start-backend & npm run start

start-deploy:
	npm run start