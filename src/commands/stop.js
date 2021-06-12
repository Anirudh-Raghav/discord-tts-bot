module.exports = {
    name: 'stop',
    descripton: 'Stop the TTS and leave the channel',
    aliases: ['dc', 'disconnect'],
    emoji: '🙊',
    execute(message) {
        const { Player, voice } = message.guild;
        const connection = voice ? voice.connection : null;
        const VoiceChannel = voice ? voice.channel : null;

        if (!connection)
            return message.reply('Am I even in a channel ||***CRINGE***||');

        if (!VoiceChannel)
            return message.reply('Wow! shouldn\'t you be in the channel to do that ||***CRINGE***||');

        Player.stop()
            .then(() => {
                message.react(this.emoji);
                message.channel.send(`Successfully left the ${VoiceChannel} channel`);
            })
            .catch((err) => {
                console.log(err);
                message.channel.send('There was an error while running the following command');
            });
    }
}