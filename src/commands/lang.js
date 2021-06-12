const { MessageEmbed } = require('discord.js');
const languages = require('../../data/languages.json');

module.exports = {
    name: 'lang',
    description: 'Change the medium language for the TTS',
    emoji: '🔡',
    guildOnly: true,
    execute(message, args, prefix) {
        let [lang] = args;
        const { Player } = message.guild;

        if (!lang) {
            const langEmbed = new MessageEmbed()
                .setTitle('Language')
                .setColor('#45ada8')
                .addFields(
                    {
                        name: '\u200b',
                        value: `**Current language: ${Player.lang === undefined ? languages['en'] : languages[Player.lang]}**\n\nFor changing the language, run \`${prefix}langs\` to\nsee the list of all available languages and\nrun \`${prefix}lang <lang_code>\` to change the lang`,
                        inline: false
                    },
                )
            return message.channel.send(langEmbed);
        }

        lang = lang.toString().toLowerCase();

        Player.setLang(lang, prefix)
            .then((lang) => {
                message.channel.send(`language has been set to **${lang}**.`);
            })
            .catch((err) => {
                console.log(err);
                message.channel.send('There was an error while running the command. Please try again');
            });
    },
};