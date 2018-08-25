# Maintenance-Tracker-React

A maintenance tracker app using an Expressjs REST API and React Frontend

## Introduction

[![Build Status](https://travis-ci.org/Veraclins/Maintenance-Tracker-React.svg?branch=develop)](https://travis-ci.org/Veraclins/Maintenance-Tracker-React) [![Maintainability](https://api.codeclimate.com/v1/badges/3185baf2767d48b4f0b3/maintainability)](https://codeclimate.com/github/Veraclins/Maintenance-Tracker-React/maintainability)

Maintenance tracker is an app that makes managing of repair/maintenance operations very easy and seamless.
With a very intuitive  [frontend](https://veraclins-m-tracker.herokuapp.com) and a robust `Express js` [REST API](https://veraclins-m-tracker.herokuapp.com/api/v1), the app is very easy to use. 

To use the app, register an account on the [frontend](https://veraclins-m-tracker.herokuapp.com) and create a request.

## Features

the app has the following features:

- A User can:
  - create an account and login.
  - make maintenance/repairs requests.
  - view all his/her requests.
  - view details of a request.
  - update a request, if it is yet to be approved.

- An admin can:
  - approve or disapprove a request.
  - mark request as resolved once it is done.
  - view all requests on the application.
  - filter requests.
  - view the details of a request.

## Installation

To run the app locally, setup a local development environment. Ensure that [`Nodejs`](https://nodejs.org/en/download/) and [`PostgreSQL`](https://www.postgresql.org/download/) are installed on your machine.

1. Clone the repository: `git clone https://github.com/Veraclins/Maintenance-Tracker-React.git`.
2. Navigate to the project directory: `cd Maintenance-Tracker-React`
3. Install dependencies: `npm install`.
4. Change .env-example to .env.
5. Create a postgres database and update .env with the credentials (The database url is in the form of `postgres://username:password@host:PORT_NO/database_name`)
6. Set SSL to false in src/database/index.js (`SSL: false`)
7. Run `npm run dev` to start the app with hot reloading or `npm start` to start it normally.
8. visit http://localhost:3000 (or any port set in the .env file)

## Testing

To run the tests:

1. Ensure you have done items 1-5 above.
2. Run `npm test`

The API runs on PORT 3000 by default but you can run it on any port you want by updating the port in .env file.

The API docs is available [here](https://veraclins-m-tracker.herokuapp.com/api-docs)
