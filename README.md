![Typescript](https://img.shields.io/badge/Typescript-4.2.4-72147e?style=flat-square&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-3.3.2-f21170?style=flat-square&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-14.4-fa9905?style=flat-square&logo=javascript&logoColor=white)
![npm](https://img.shields.io/badge/npm-7.6-ff5200?style=flat-square&logo=npm&logoColor=white)
![yarn](https://img.shields.io/badge/yarn-1.22.4-72147e?style=flat-square&logo=yarn&logoColor=white)
![swagger](https://img.shields.io/badge/swagger-2.0-f21170?style=flat-square&logo=swagger&logoColor=white)
![express](https://img.shields.io/badge/express-4.17.1-fa9905?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4.6-ff5200?style=flat-square&logo=mongodb&logoColor=white)

# PerfAnalyticsAPI

PerfAnalytics.API is a restful API which saves data, posted from PerfAnalytics.JS and returns time specific filtered data. Application is deployed to Heroku and could be found on [api-perf-analytics.herokuapp.com](https://api-perf-analytics.herokuapp.com).

## Table of Contents:

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)
- [Building the Project](#building-the-project)
- [Running the Tests](#running-the-tests)
- [Environment Variables](#environment-variables)
- [API Endpoints and Documentations](#api-endpoints-and-documentations)
  - [GET `/metrics`](#get-metrics)
  - [POST `/metrics`](#post-metrics)
- [Contact Information](#contact-information)
- [License](#license)

<br/>

## Getting Started

<hr/>

### Requirements:

<hr/>

- MongoDB v4.4 or higher -> [mongoDB Installation Page](https://docs.mongodb.com/manual/installation)
- Node v12 or higher (with npm) -> [Node.js Downloads Page](https://nodejs.org/en/download)
- Yarn Package Manager -> Install yarn with npm: `npm install -g yarn`
- Docker v3.3.2 or higher (optional) -> [Docker Get Started Page](https://www.docker.com/get-started)
  <br/>

  Before starting the application, fork/download/clone this repo. There are two different ways to run the application:

<hr/>

### With Docker

<hr/>

- Build the docker image with the following code:

```
./docker-build.sh  # for mac users
./docker-build.bat  # for windows users
```

- To run the application on [localhost:8080](http://localhost:8080):

```
docker-compose up -d --build
```

- To stop the application:

```
docker-compose stop
```

### Without Docker

<hr/>

- Install the required dependencies:

```
yarn install
```

- To run the application in dev mode on [localhost:5000](http://localhost:5000):

```
yarn run dev
```

- To run the application with the production build on [localhost:5000](http://localhost:5000):

```
yarn build  # producing a production build
cp -r src/swagger dist/src  # copy swagger config to dist
yarn start  # running the server
```

<br/>

<br/>

## Building the Project

<hr/>

- To create an optimized production build:

```
npm run build
```

or

```
yarn build
```

<br/>

## Running the Tests

<hr/>

- To run the unit tests:

```
npm test
```

or

```
yarn test
```

- To run the load tests:

```
npm run artillary-local  # use artillary-prod for heroku app
```

or

```
yarn run artillary-local  # use artillary-prod for heroku app
```

<br/>

## Environment Variables

<hr/>

- `DB_URI`: MongoDB URI. An example could be found below.

```
mongodb+srv://<db-user>:<db-pass>@<cluster-address>/<db-name>?retryWrites=true&w=majority
```

- `PORT`: Port of the server.

<br/>
<hr/>

## API Endpoints and Documentations

REST API endpoints documentation. For further information, you can check out the Postman Collections & Environments at `postman` directory and the Swagger Documentation from `/swagger` endpoint.
`/metrics` endpoint can handle 266.67 requests per second on a:

- MacBook Pro (16-inch, 2019)
  - Processor: 2,3 GHz 8-Core Intel Core i9
  - Memory: 16 GB 2667 MHz
  - Number of Processors: 1
  - Total Number of Cores: 8
  - L2 Cache (per Core): 256 KB
  - L3 Cache: 16 MBDDR4

For further information, checkout `load-testing-report.json` file.

<hr/>

### GET `/metrics`

- Description: Get Metrics from last 30 minutes or within a time range.
- Query Parameters:
  - `startDate`: Start date of the time range. Must be in ISO8601 format. E.g. 2021-05-10T00:00:00.000Z
  - `endDate`: End date of the time range. Must be in ISO8601 format. E.g. 2021-05-10T00:00:00.000Z

#### Reponse:

```
{
    "data": [
        {
            "id": string,
            "url": string,
            "ttfb": number,
            "fcp": number,
            "domLoad": number,
            "windowLoadEvents": number,
            "resources": [
                {
                    "name": string
                    "source": string
                    "responseTime": number
                    "executionTime": number
                    "fetchTime": number
                }
            ],
            "timestamp": string
        }
    ]
}
```

<hr/>

### POST `/metrics`

- Description: Create new Metric.

<br/>

#### Request Body:

```
{
    "url": string,
    "ttfb": number,
    "fcp": number,
    "domLoad": number,
    "windowLoadEvents": number,
    "resources": [
        {
            "name": string
            "source": string
            "responseTime": number
            "executionTime": number
            "fetchTime": number
        }
    ],
    "timestamp": string
}
```

<br/>

#### Reponse:

```
{
    "id": string
}
```

<hr/>

## Contact Information

<hr/>

#### Author: Alp Gökçek

#### Github: alpgokcek

#### Email: alp.gokcek1@gmail.com

#### Date: May, 2021

<br/>

## License

<hr/>

[MIT](https://choosealicense.com/licenses/mit/)
