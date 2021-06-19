const Discord = require('discord.js')
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const config = require('../../config/shiko.json')

module.exports = {
    name: 'rank',
    category: 'rank',
    description: "Shows user's Rank",

    run: async (client, message, args, shikodb) => {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild, true);
        const avatar = target.displayAvatarURL({ dynamic: false, format: 'png' })

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        if (!user) return message.channel.send(new Discord.MessageEmbed()
            .setTitle('uhmm')
            .setDescription('Seems like this user has not earned any xp so fay huhu')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )


        const rank = new canvacord.Rank()
            .setAvatar(avatar)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status, true, true)
            .setRank(user.position)
            .setLevel(user.level)
            .setProgressBar(config.colors.yes, "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build().then((data) => {
            const attachment = new Discord.MessageAttachment(data, 'RankCard.png');
            message.channel.send(attachment)
        })
    }
}