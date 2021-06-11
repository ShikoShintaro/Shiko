const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
    name: 'volume',
    aliases: ['v'],
    description: 'Ajusts the volume',
    usage: "s!v",

    run: async (client, message, args) => {
        const channel = message.member.voice.channel;
        if (!channel)
            return message.channel.send(new MessageEmbed()
            .setTitle('Oi')
            .setDescription("You must Join a voice channel before using this command!")
            .setColor(config.colors.no)
          );

        let queue = message.client.queue.get(message.guild.id);

        if (!args[0])
            return message.channel.send(
                new MessageEmbed()
                    .setAuthor(
                        "Master Volume Controller"
                        )
                    .setColor("BLUE")
                    .setDescription("**Current volume is " + queue.volume + " **")
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );

        if (args[0] > 100)
            return message.channel.send(
                new MessageEmbed()
                    .setAuthor(
                        "Master Volume Error"
                        )
                    .setColor(config.colors.no)
                    .setDescription("**Volume cannot exceed 100**")
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );

        queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        queue.volume = args[0];
        message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    "Master Volume Controller"
                    )
                .setColor("BLUE")
                .setDescription("**Volume set to " + args[0] + "**")
                .setFooter(client.user.username, client.user.displayAvatarURL())
        );
    }
}