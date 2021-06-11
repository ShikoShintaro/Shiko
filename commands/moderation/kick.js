const Discord = require('discord.js')
const client = require('../../shiko-main')
const currentDate = new Date();
const config = require('../../config/shiko.json')

module.exports = {
    name: 'kick',
    aliases: ['k'],
    permissions: ['KICK_MEMBERS'],
    description: 'Kicks a member in one hit',

    run: async (client, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!args[0])
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('No Member Mentioned')
                .addField('Pls Specify a user')
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (!mentionedMember)
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('I cannot kick the mentioned user')
                .addField('Awee~ This mentioned user is higher role than mine or this user is my Fate~')
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (mentionedMember.id === message.author.id)
            return message.channel.send(new Discord.MessageEmbed()
                .addField('You cannot kick yourself BAKA!!')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (!mentionedMember.kickable)
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('Aweee Error')
                .setDescription('Awee~ This mentioned user is higher role than mine~')
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp(currentDate.toLocaleString())
            )

        let reason = args.slice(1).join(" ");
        if (reason === undefined) reason = 'No reason given'

        const kickEmbed = new Discord.MessageEmbed()
            .setTitle('You have been kicked')
            .addField('You were kicked from:', message.guild.name)
            .addField('For Reason:', reason)
            .addField('Time Kicked', currentDate.toLocaleString())
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor("RANDOM")

        await mentionedMember.send(kickEmbed)
        try {
            await mentionedMember.kick(reason)
        } catch (err) {
            return message.channel.send('there was an error sorry')
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Aweee A Member Was Kicked')
            .addField('Member:', mentionedMember)
            .addField('For Reason:', reason)
            .addField('Time Kicked', currentDate.toLocaleString())
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor(config.colors.no)

        await message.channel.send(embed)
    }
}