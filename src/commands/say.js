const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Sends a TTS message in the voice chaneel',
    emoji: '🗣',
    aliases: ['read'],
    guildOnly: true,
    execute(message, args) {
        const { Player, voice } = message.guild;
        const voiceChannel = message.member.voice.channel;
        const connection = voice ? voice.connection : null;
        const phrase = args.join(' ');

        if (!voiceChannel)
            return message.reply('Get into a channel and then type it again or it\'s rly pointless u c');

        if (!voiceChannel.joinable) {
            return message.reply('Give me permissions to join the channel beforing summonning me ...');
        }

        if (!phrase) {
            message.reply('What should I even speak? Air ...');
            return;
        }

        const sayEmbed = new MessageEmbed()
            .setTitle('`Joined ${voiceChannel} to obliterate your ears\t (～￣▽￣)～')

        if (connection) {
            message.react(this.emoji);
            message.channel.send(`Again ... I'll shout again in ${voiceChannel}\t ♪(´▽｀)`);
            Player.say(phrase);
        }
        else {
            voiceChannel.join()
                .then(() => {
                    message.react(this.emoji);
                    message.channel.send(`Joined ${voiceChannel} to obliterate your ears\t (～￣▽￣)～`);
                    Player.say(phrase);
                })
                .catch((err) => {
                    console.log(err)
                    message.channel.send('There was an error while running the command. Please try again');
                });
        }
    },
}