# **Food Tracker API** #

## Prerequisites ##
Nodejs v8, git, npm

## Setup ##
1) Clone the repo and npm install
 > npm install

Additionally you will need knex cli to be installed.
 > npm install -g knex

2) Create a database called food_tracker_db with psql.

## Run ##
Run following command from parent directory to start the application
 >  npm start

## Database Setup ##

1) Update knexfile.js to use your local development database.

2) Run following command to create tables.
   > knex migrate:latest
   
   For staging/production, use
   > knex migrate:latest --env production