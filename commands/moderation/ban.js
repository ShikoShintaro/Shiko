const Discord = require('discord.js')
const client = require('../../shiko-main')
const currentDate = new Date();
const config = require('../../config/shiko.json')

module.exports = {
    name: 'ban',
    aliases: ['b'],
    permissions: ['BAN_MEMBERS'],
    description: 'Bans a member in one hit',

    run: async (client, message, args) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!args[0])
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('No Member Mentioned')
                .addField('Pls Specify a user')
                .setColor(config.colors.no)
                .setTimestamp(currentDate.toLocaleString())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (!mentionedMember)
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('I cannot ban the mentioned user')
                .addField('Awee~ This mentioned user is higher role than mine or this user is my Fate~')
                .setColor(config.colors.no)
                .setTimestamp(currentDate.toLocaleString())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (mentionedMember.id === message.author.id)
            return message.channel.send(new Discord.MessageEmbed()
                .addField('You cannot ban yourself BAKA!!')
                .setTimestamp(currentDate.toLocaleString())
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        if (!mentionedMember.bannable)
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('Aweee Error')
                .setDescription('Awee~ This mentioned user is higher role than mine~')
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp(currentDate.toLocaleString())
            )

        let reason = args.slice(2).join(` `);
        if (!reason) {
            reason = `NO REASON`;
        }

        const banEmbed = new Discord.MessageEmbed()
            .setTitle('You have been banned')
            .addField('You were banned from:', message.guild.name)
            .addField('For Reason:', reason)
            .addField('Time Banned', currentDate.toLocaleString())
            .setTimestamp(currentDate.toLocaleString())
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor("RANDOM")

        await mentionedMember.send(banEmbed)
        await mentionedMember.ban({
            reason: reason
        }).then(() => message.channel.send(new Discord.MessageEmbed()
            .setTitle('Aweee A Member Was Banned')
            .addField('Member:', mentionedMember)
            .addField('For Reason:', reason)
            .addField('Time Banned', currentDate.toLocaleString())
            .setTimestamp(currentDate.toLocaleString())
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor("RANDOM")
        ))

    }
}