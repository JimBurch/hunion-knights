module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(message, args) {
		const user = args[0];
		message.channel.send(`You want to kick ${user}`);
	},
};
