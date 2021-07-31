require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE'],
});

const { PREFIX, BOT_TOKEN } = process.env;

client.on('ready', () => {
	console.log('Hunion Bot, ready for battle!');
});

client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(
				`You didn't provide any arguments, ${message.author}!`
			);
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`First argument: ${args[0]}`);
	} else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		// Grab the "first" mentioned user from the message
		// This will return a `User` object, just like `message.author`
		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(
				`Your avatar: <${message.author.displayAvatarURL({
					format: 'png',
					dynamic: true,
				})}>`
			);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({
				format: 'png',
				dynamic: true,
			})}>`;
		});

		// Send the entire array of strings as a message
		// By default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	}
});

client.on('messageDelete', msg => {
	msg.reply('stop deleting messages!!');
});

client.login(BOT_TOKEN);
