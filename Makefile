lint-frontend:
	make -C frontend lint

install:
	npm ci

install-deploy:
	

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npm run start

build:
	rm frontend/build -rf
	npm run build