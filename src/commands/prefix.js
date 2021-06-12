const fs = require('fs');


module.exports = {
    name: 'prefix',
    description: 'Sends a TTS message in the voice chaneel',
    emoji: '🗣',
    guildOnly: true,
    execute(message, args) {
        if (!message.guild.members.cache.get(message.author.id).hasPermission('MANAGE_SERVER'))
            return message.reply('You don\'t have the permissions ... If you are so bored than play with yourself');

        // if (!args[0] || args[0 = 'help'])
        if (!args[0])
            return message.reply('Usage: \`<default/old prefix here>prefix <desired prefix here>\`');

        let prefixes = JSON.parse(fs.readFileSync('../serverSettings.json', 'utf8'));

        prefixes[message.guild.id] = { prefix: args[0] };

        // fs.writeFile('../serverSettings.json', 'utf8', JSON.stringify(prefixes), (err) => {
        //     if (err) console.log(err);
        // });

        fs.writeFile('../serverSettings.json', JSON.stringify(prefixes), (err) => {
            if (err) console.log(err);
        });

        message.channel.send(`The prefix has been updated to \`${args[0]}\``)
    },
}