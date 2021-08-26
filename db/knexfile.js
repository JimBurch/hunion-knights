require('dotenv').config();

const { NODE_ENV, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
	[NODE_ENV]: {
		client: 'postgresql',
		connection: {
			database: DB_NAME,
			user: DB_USER,
			password: DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
