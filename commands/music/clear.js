const { MessageEmbed, Message } = require('discord.js')
const config = require('../../config/shiko.json')

module.exports = {
    name: "clear",
    description: "Clears The Queue",
    usage: "s!clear s!cl", permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["cl"],

    run: async (client, message, args, shikoDB) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player)
            return message.channel.send(new MessageEmbed()
                .setTitle('Uhmm')
                .setDescription('Nothing is playing right now...')
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )
        if (!player.queue || !player.queue.length || player.queue.length === 0)
            return message.channel.send( new MessageEmbed()
                .setTitle('Uhmm')
                .setDescription("❌ | **Nothing is playing right now...**")
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )    
            if (!message.member.voice.channel)
                return message.channel.send(new MessageEmbed()
                    .setTitle('OI')
                    .setDescription("❌ | **You must be in a voice channel to play something!**")
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
                return message.channel.send ( new MessageEmbed()
                    .setTitle('OI')
                    .setDescription("❌ | **You must be in the same voice channel as me to use this command!**")
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            player.queue.clear();
                await message.channel.send( new MessageEmbed()
                    .setTitle('Yey~')
                    .setDescription("✅ | **Shiko Clears the queue!**")
                    .setColor(config.colors.yes)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
    }
}