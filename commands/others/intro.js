const Discord = require('discord.js')
const config = require('../../config/shiko.json')

module.exports = {
    name: 'intro',
    description: 'Shiko bot introduction~',
    usage: 's!intro',

    run : async(client, message, args) => {
        message.channel.send( new Discord.MessageEmbed()
            .setAuthor('Harooo~~~ Shiko Bot here~','https://i.imgur.com/uxcvoiI.gif')
            .addFields(
                { name: 'Shiko bot is for Shiko\'s official server and this bot will not be available to any server (might change her mind)',
                  value: 'You can use `s!help` to find all of my commands!',
                  inline: 'true'
                },
                {
                  name: 'If you encounter some errors, You can contact my master to fix the issue',
                  value: 'If You want to Follow my master\'s Social media here are the links~!',
                  inline: 'true'
                }
            )
            .addFields(
                { name : 'Twitter:', value: 'https://twitter.com/ShikoShintaro',},
                { name : 'Youtube', value : 'https://www.youtube.com/channel/UCX8NTJwJ4YRnckeOPnW7nBA',},
                { name: 'Facebook Page', value : 'https://www.facebook.com/ShikoShempai/',}
            )
            .setColor(config.colors.join)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
        message.delete()
    }
}