const knex = require('../../db/db');

module.exports = {
	name: 'add-test',
	description: 'Adds a new record to the test database',
	execute(message, args) {
		const input = args[0];
		message.channel.send('Record added');
		knex('test')
			.insert({
				test_field: input,
			})
			.catch(e => {
				throw new Error(e);
			});
	},
};
