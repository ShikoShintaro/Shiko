const { MessageEmbed } = require('discord.js')
const config = require('../../config/shiko.json')

const levels = {
    none: 0.0,
    low: 0.2,
    medium: 0.3,
    high: 0.35,
};

module.exports = {
    name: "bassboost",
    description: "Enables the bass boost audio effect",
    usage: "s!bassboost s!bb <none|low|medium|high",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["bb"],

    run : async (client, message, args, shikoDB) => {
        
        let player = await client.Manager.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed() 
            .setTitle('Uhmm')
            .setDescription('Nothing is playing right now...')
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )

        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed()
            .setTitle('Uhhh')
            .setDescription("❌ | **You must be in a voice channel to use this command!**")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )

        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setTitle('OI')
            .setDescription("**Please provide a bassboost level. \nAvailable Levels:** `none`, `low`, `medium`, `high`")
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        return message.channel.send(new MessageEmbed()
            .setTitle('Yey~')
            .setDescription(`✅ | **Bassboost level set to** \`${level}\``)
            .setColor(config.colors.yes)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
    },
}