const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command',
    aliases: ['commands'],
    usage: '[command name]',
    guildOnly: true,
    execute(message, args, prefix) {
        const HelpEmbed = new MessageEmbed()
            .setTitle('Command List')
            .setColor('#45ada8')
            .setDescription(`Prefix is ${prefix}`)
            .addFields(
                { name: 'say', value: `\`${prefix}say <phrase>\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Can be used to yell out what you type in the <phrase>")`, inline: true },
                { name: 'stop', value: `\`${prefix}stop\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Stop the bot from talking a word")`, inline: true },
                { name: 'speed', value: `\`${prefix}speed <speed>\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Set the speed to either slow or normal but substituting it in the <speed> section")`, inline: true },
                { name: 'lang', value: `\`${prefix}lang <desired lang code>\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Change the bot's processing language")`, inline: true },
                { name: 'langs', value: `\`${prefix}langs\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Display all the language options")`, inline: true },
                { name: 'prefix', value: `\`${prefix}prefix <desired prefix>\`\n[Hover for info, don't click tho](https://discord.js.org/#/docs/main/stable/class/MessageEmbed "Change the prefix to a new and customise even further")`, inline: true },

            )

        message.channel.send(HelpEmbed);
    },
};