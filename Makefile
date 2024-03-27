.PHONY: start down logs status mongo-shell app-build app-dev app-start test-unit test-integration test test-coverage test-filter lint lint-and-fix format husky help
.DEFAULT_GOAL := help
run-docker-compose = docker compose -f docker-compose.yml

up: # Start containers and tail logs
	$(run-docker-compose) up -d
	make logs

down: # Stop all containers
	$(run-docker-compose) down

logs: # Tail container logs
	$(run-docker-compose) logs -f mongodb

status: # Show status of all containers
	$(run-docker-compose) ps

mongo-shell: # Open mongodb database shell
	$(run-docker-compose) exec mongodb mongosh

app-build: # Build app
	npm run build

app-dev: # Run app in development mode
	npm run dev

app-start: # Start app in production mode
	npm start

test-unit: # Run unit tests
	npm run test-unit

test-integration: # Run integration tests
	npm run test-integration

test: # Run all tests
	npm run test

test-coverage: # Run all tests with coverage
	npm run test-coverage

test-filter: # Run all tests with filter
	npm run test-filter --filter=$(filter)

lint: # Run linter
	npm run lint

lint-and-fix: # Run linter and fix errors
	npm run lint-and-fix

format: # Run formatter
	npm run format

husky: # Run husky
	npm run husky-prepare
	npm run husky-generate-pre-commit

help: # make help
	@awk 'BEGIN {FS = ":.*#"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?#/ { printf "  \033[36m%-27s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
