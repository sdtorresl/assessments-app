# Assessments API

An assessments API for correlation-one.

## Requirements

- npm
- mongodb

## Getting started

### With docker

You can deploy this application by using docker as follows:

```{bash}
docker-compose build
docker-compose up
```

#### Import initial data to DB

```{bash}
docker exec assessmentsapp_mongo_1 mongoimport --host localhost --db assessments --collection assessments --type json --file /data/initial/test.json --jsonArray
docker exec assessmentsapp_mongo_1 mongoimport --host localhost --db assessments --collection questions --type json --file /data/initial/questions.json --jsonArray
```

#### Run tests

```{bash}
docker exec assessmentsapp_web_1 npm run test
```

#### Try it

```{bash}
curl -X GET http://localhost:8000/api/v1
```

## Install

- Setup env variables

```{bash}
cp .env.sample .env
vim .env
```

- Install dependencies

```{bash}
npm install
```

## Development

```{bash}
npm run dev
```
