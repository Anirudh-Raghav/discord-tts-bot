module.exports = {
    name: 'speed',
    description: 'change talking speeds between **normal** and **slow**',
    emoji: '↔',
    execute(message, args, prefix) {
        const speed = args[0];
        const { Player } = message.guild;

        if (!speed)
            return message.reply(`To alter how fast I talk, type: **${prefix}speed <speed>** and replace *<speed>* with either *normal* or *slow*.`);

        Player.setSpeed(speed)
            .then(() => {
                message.react(this.emoji);
                const reply = speed === 'slow' ? `Can't understand me ... nvm, I'll speak slower from now on` : `Get ready for my my ... **NORMAL** voice （￣︶￣）↗　`;
                message.reply(reply);
            })
            .catch((err) => {
                console.log(err);
                message.channel.send('There was an error while running the following command');
            });
    }
}