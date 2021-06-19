const Discord = require('discord.js')
const Levels = require('discord-xp')
const config = require('../../config/shiko.json')


module.exports = {
    name: 'leaderboards',
    category: 'rank',
    aliases: ['lb'],

    run: async (client, message, args, shikodb) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(
            (e) => 
            `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); 

        
        const leaderb = new Discord.MessageEmbed()
            .setColor(config.colors.join)
            .setAuthor('LEADERBOARDS')
            .setDescription(lb.join('\n\n'))
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            
        message.channel.send(leaderb)
    }
}