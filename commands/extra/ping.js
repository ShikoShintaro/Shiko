const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'fun',
    description: 'Bot Ping??',
    
    run : async(client, message, args) => {
        const msg = await message.channel.send('Pwease Wait....')
        const PingEmbed = new Discord.MessageEmbed()
        .setTitle('Tada~~!')
        .setDescription(`${client.ws.ping} ms`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL())

        await message.channel.send(PingEmbed)
        msg.delete()
    }
}