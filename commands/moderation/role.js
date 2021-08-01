module.exports = {
	name: 'role',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		const user = args[0];
		const role = args[1];
		message.channel.send(`You want to assign ${role} to ${user}`);
	},
};
