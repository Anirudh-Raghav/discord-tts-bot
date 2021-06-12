require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { Structures } = require('discord.js');
const Player = require('./classes/Player');


Structures.extend('Guild', Guild => {
    class PlayerGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.Player = new Player(this);
        }
    }
    return PlayerGuild;
});

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`Successfully up and running as ${client.user.tag} using the default prefix: %`);
});

client.once('reconnecting', () => {
    console.log('Reconnecting');
});

client.once('disconnect', () => {
    console.log('Disconnected!');
});

client.on('message', (message) => {
    const prefixes = JSON.parse(fs.readFileSync('./serverSettings.json', 'utf8'));

    if (!prefixes[message.guild.id])
        prefixes[message.guild.id] = { prefix: '%' }
    const prefix = prefixes[message.guild.id].prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm')
        return message.reply('I can\'t execute commands inside DMs');

    if (command.args && !args.length) {
        let reply = 'You didn\'t provide any arguements';
        if (command.usage)
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;

        return message.reply(reply);
    }

    try {
        command.execute(message, args, prefix);
    }
    catch (err) {
        console.log(err);
        message.reply('There was an error while preocessing your command, please try again later');
    }
});

client.login(process.env.DISCORD_TOKEN)
    .then((token) => {
        client.user.setPresence({
            status: 'online',
            activity: {
                name: `with my bros`,
                type: 'COMPETING',
            }
        });
    });