# Express Rest API on IMDB data

## Features

- CRUD API over IMDB data
- Manage movies and actors data
- Assign actors to movies and vice versa
- Rate a movie
- Filter and paginate data


---


## Stack

- Node
- Express
- Nest
- TypeORM
- MongoDb
- Jest
- SuperTest
- Docker


---


### Development environment setup

#### Prerequisites

- Docker
- VSCode
- Remote Containers extension

#### Guide

##### IDE setup
- Clone repository or download and extract zip file
- Open folder in VSCode
- Choose to reopen in container when prompted
- Give docker a minute to build the container
##### Database setup
- Run `setup/setup.sh` which will download, extract and import data
##### Start dev server
- Run `npm run start` to start the development server at `http://localhost:3000/`
##### Run tests
- Run `npm run test` for unit tests
- Run `npm run test:e2e` for integration tests