module.exports = {
	name: 'marco',
	description: 'Marco Polo',
	cooldown: 5,
	execute(message) {
		message.channel.send('Polo.');
	},
};
