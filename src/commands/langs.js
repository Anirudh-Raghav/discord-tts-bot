const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'langs',
    description: 'Shows all the languages available',
    emoji: '🗣',
    aliases: ['showLangs'],
    guildOnly: true,
    execute(message, args, prefix) {
        const langEmbed = new MessageEmbed()
            .setTitle('Language options')
            .setColor('#45ada8')
            .setDescription(`Prefix is ${prefix}`)
            .addField('Offered languages',
                `
                    :flag_us: English - \`${prefix}lang en\`
                    :flag_fr: French - \`${prefix}lang fr\`
                    :flag_sa: Arabic - \`${prefix}lang ar\`
                    :flag_de: German - \`${prefix}lang de\`
                    :flag_es: Spanish - \`${prefix}lang es\`
                    :flag_gr: Greek - \`${prefix}lang el\`
                    :flag_ru: Russian - \`${prefix}lang ru\`
                    :flag_it: Italian - \`${prefix}lang it\`
                    :flag_id: Japanese - \`${prefix}lang ja\`
                    :flag_kr: Korean - \`${prefix}lang ko\`
                    :flag_id: Hindi - \`${prefix}lang hi\`
                    :flag_bd: Bengali - \`${prefix}lang bn\`
                    :flag_in: Malayalam - \`${prefix}lang ml\`
                    :flag_in: Marathi - \`${prefix}lang mr\`
                    :flag_in: Kannada - \`${prefix}lang kn\`
                `);
        message.channel.send(langEmbed);
    },
}