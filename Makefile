SHELL := /bin/bash

APP_NAME = ts-express
APP_NAME := $(APP_NAME)

CONTAINER_NAME = ts-express-api

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

build: ## Build the container image - Production
	docker build -t ${APP_NAME}\
		-f Dockerfile .

run: ## Run the container image
	docker run -d -it -p 3000:3000 --name ${CONTAINER_NAME} ${APP_NAME}

pause: ## Pause the containers
	docker container rm -f ${CONTAINER_NAME}

clean: ## Clean the images
	docker rmi -f ${APP_NAME}

remove: ## Remove the volumes
	docker volume rm -f ${APP_NAME}
