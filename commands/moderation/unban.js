const Discord = require('discord.js')
const client = require('../../shiko-main')
const currentDate = new Date();
const config = require('../../config/shiko.json')

module.exports = { 
    name: 'unban',
    permissions: ['BAN_MEMBERS'],
    aliases: ['ub'],
    usage: "s!ub id",
    description: 'Unbans a member',

    run: async(client, message, args) => {
        let reason = args.slice(1).join(" ");
        let userId = args[0]

        if (!reason) reason = 'No Reason';
        if (!userId) 
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('Aweeee')
                .addField('Please provide a ID for me to Unban')
                .setTimestamp(currentDate.toLocaleString())
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
        )

        if (isNaN(userId)) 
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle('Aweeee')
                .addField('Please provide a valid ID that is numbers')
                .setColor(config.colors.no)
                .setTimestamp(currentDate.toLocaleString())
                .setFooter(client.user.username, client.user.displayAvatarURL())
        )

        message.guild.fetchBans().then(async bans => {
            if (bans.size === 0)
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Aweeee')
                    .addField('No one is banned in this server')
                    .setColor(config.colors.no)
                    .setTimestamp(currentDate.toLocaleString())
                    .setFooter(client.user.username, client.user.displayAvatarURL())  
                )
            let BannedUser = bans.find(ban => ban.user.id = userId)

            if (!BannedUser) 
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Aweeee')
                    .addField('This user isnt banned')
                    .setColor(config.colors.no)
                    .setTimestamp(currentDate.toLocaleString())
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            await message.guild.members.unban(BannedUser.user, reason).catch(err => {
                return message.channel.send(new Discord.MessageEmbed()
                    .setTitle("Aweee")
                    .addField('Something went wrong sorryy~~')
                    .setColor(config.colors.no)
                    .setTimestamp(currentDate.toLocaleString())
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            }).then(() => {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Yay~~~')
                    .addField(`The Member Id ${userId} has been unbanned yey~`)
                    .setColor(config.colors.yes)
                    .setTimestamp(currentDate.toLocaleString())
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            })
        })  
    }
}