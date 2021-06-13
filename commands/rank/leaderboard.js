const { Discord, MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../../config/shiko.json')
const canvacord = require('canvacord')

module.exports = {
    name: "leaderboards",
    description: "Checks Leaderboard on the server",
    aliases: ['lb'],

    run: async (client, message, args, shikoDB) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); 

        const Leaderboard = new MessageEmbed()
            .setColor(roleColor)
            .setAuthor('Leaderboards')
            .setDescription(lb.join('\n\n'))
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(Leaderboard)
    }
}