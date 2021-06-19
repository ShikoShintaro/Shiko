const Discord = require('discord.js')
const client = require('../shiko-main')
const currentDate = new Date();
const config = require('../config/shiko.json')


client.on('guildMemberAdd', async (member) => {
    const Channel = member.guild.channels.cache.get('765210713726910554')
    const embed = new Discord.MessageEmbed()
        .setColor(config.colors.yes)
        .setAuthor('Welcome new Member', 'https://i.imgur.com/0VwsVVC.jpg')
        .setImage(`https://cdn.discordapp.com/attachments/844770797256310794/850649865796190218/giphy.gif`)
        .setDescription(`**${member.displayName}** welcome to **${member.guild.name}**, we now have **${member.guild.memberCount}** members!`)
        .setTimestamp(currentDate.toLocaleString())
        .setFooter(client.user.username, client.user.displayAvatarURL())
    Channel.send(embed)
})