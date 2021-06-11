const Discord = require('discord.js');
const client = require('../../shiko-main');

module.exports = {
    name: 'avatar',
    aliases: ['ava', 'a'],
    description: 'Display someone\'s avatar',

    run : async(client, message, args) => {
        const user = message.mentions.users.first() || message.author || client.users.cache.get(u => u.id === args[0])
        
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true})

        let embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}\'s Avatar`)
        .setImage(avatar)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())
        return message.channel.send(embed)
    }
}