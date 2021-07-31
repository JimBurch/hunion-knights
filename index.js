require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE'],
});

const { BOT_TOKEN } = process.env;

client.login(BOT_TOKEN);

client.on('ready', () => {
	console.log('Ready for battle!');
});

client.on('message', msg => {
	if (msg.content === 'are we ready for battle?') {
		msg.reply('hell yeah');
	} else if (msg.content === 'u good bro') {
		msg.channel.send('nah');
	} else if (msg.content === 'down with syndicate') {
		msg.react('❤️');
	} else if (msg.content === 'gimme mod') {
		msg.member.roles.add('870852668862636082');
	}
});

client.on('messageDelete', msg => {
	msg.reply('stop deleting messages!!');
});
