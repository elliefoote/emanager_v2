## Description

## Installation & setup

```bash
$ yarn install
```

Create a .env file with the following secrets:

- DATABASE_URL (see note below for local dev)
- JWT_SECRET (your JWT secret key)

## Local DB with Docker

```bash
# create & start container
$ yarn start:dev:db

# seed testing data
$ yarn seed
```

You can also create your own local DB with the following configuration:

```
host: 'localhost'
port: 5432
username: 'postgres'
password: '1234'
database: 'emanager'
```

If you don't change any configuration, the DATABASE_URL env variable should be 'postgresql://postgres:1234@localhost:5432/emanager?schema=public'

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

The server runs on port 5000.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
