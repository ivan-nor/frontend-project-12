lint-frontend:
	make -C frontend lint

install:
	npm ci && cd frontend && npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

start-deploy:
	npx start-server & npx serve -s frontend/build