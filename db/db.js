require('dotenv').config();
const knex = require('knex');
const knexfile = require('./knexfile');

const { NODE_ENV } = process.env;

const db = knex(knexfile[NODE_ENV]);
module.exports = db;
