module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		const user = args[0];
		message.channel.send(`You want to kick ${user}`);
	},
};
