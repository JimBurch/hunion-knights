require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE'],
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// COMMAND FILE GATHERING
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const { PREFIX, BOT_TOKEN } = process.env;

client.once('ready', () => {
	console.log('Hunion Bot, ready for battle!');
});

// MESSAGE COMMAND HANDLER
client.on('message', message => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) {
		return message.reply(
			`"${PREFIX}${commandName}" is not a valid command. Try ${PREFIX}help to learn more commands.`
		);
	}

	// CHECK THE COMMAND FOR GUILDONLY: TRUE
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute that command inside DMs!");
	}

	// CHECK COMMAND & USER FOR THE RIGHT PRIVILEGES
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	// CHECK THE COMMAND FOR ARGUMENTS (IF ARGS: TRUE)
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// CHECK FOR A COOLDOWN AND ENFORCE IT!
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('messageDelete', msg => {
	msg.reply('stop deleting messages!!');
});

client.login(BOT_TOKEN);
