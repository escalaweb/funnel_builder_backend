 <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

<h3 align="center"> Developed by:
    <a href="https://www.linkedin.com/in/alvarosego01/" target="_blank">
        Álvaro Segovia
    </a>
</h3>

# Description

---

# Installation

### 1. Clone project and install

```bash
$ yarn install
```

### 2. Set .env file

```
Copy the .env.template file and rename it
as .env to initialize your environment variables
```

### 3. Create and initialize the database with docker

```bash
$ docker-compose up -d
```

### 4. Start project

```bash
$ yarn start:dev
```

### 5. Initializes the endpoint seed to have default users and roles


## Recomendations

### See the project documentation on your browser for more usage information.

```bash
$ run endpoint  http://localhost:{yourPort}/api-doc
```

# Serverless setup

### 1. Start serverless app offline mode
```bash
$ serverless offline start --stage development
```
### Note
--stage has the following environments flag variables ( development | staging | production )

-development: it is for development in local environment <br>
-staging: it is for development sample in a test https url <br>
-production: is for final deployment and production use

# Docker create image

### Build
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

### Run
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

### Note

By default, __docker-compose__ uses the ```.env``` file, so if you have the .env file and configure it with your production environment variables, it would suffice

```
docker-compose -f docker-compose.prod.yaml up --build
```

# Docker update build image
```
docker-compose up -d --remove-orphans
```

Optionally, I remove obsolete images:

```
docker image prune
```

