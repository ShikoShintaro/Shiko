const { Discord, MessageEmbed, MessageAttachment } = require('discord.js')
const shikoDB = require('../../config/shiko.json')
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const config = require('../../config/shiko.json')

module.exports = {
    name: 'rank',
    description: 'checks Rank',

    run: async (client, message, args, shikoDB) => {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id, true);

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        if (!user) return message.channel.send(new MessageEmbed()
            .setTitle('Uhmm')
            .setDescription("Seems like this user has not earned any xp so far.")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );

        // message.channel.send(`> **${target.tag}** is currently level ${user.level}.`);

        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ dynamic : false, format: 'png' }))
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(message.author.presence.status, true, true)
            .setRank(user.position)
            .setLevel(user.level)
            .setProgressBar(config.colors.yes, "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator);

            rank.build().then((data) => {
                const attachment = new MessageAttachment(data, 'RankCard.png')
                message.channel.send(attachment)
            })
    }
}