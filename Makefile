lint-frontend:
	make -C frontend lint

install:
	npm ci


start-frontend:
	make -C frontend start

start-backend:
	npx start-server

develop:
	make start-backend & make start-frontend

start:
	npm run start

build:
	rm frontend/build -rf
	npm run build

test:
	make -C frontend test
