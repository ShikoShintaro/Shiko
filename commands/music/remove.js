const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
    name: 'remove',
    aliases: ['r'],
    description: 'Removes a queue',
    usage: "s!r",

    run: async (client, message, args) => {
        const channel = message.member.voice.channel;
        if (!channel)
            return message.channel.send(new MessageEmbed()
            .setTitle('Oi')
            .setDescription("You must Join a voice channel before using this command!")
            .setColor(config.colors.no)
            .setFooter(client.user.username, client.user.displayAvatarURL())
          );
        if (!args[0])
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("No song number provided")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (isNaN(args[0]))
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("**Args must be number [Example: -remove 2]**")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        let queue = message.client.queue.get(message.guild.id);
        if (args[0] == 1)
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(
                        "**Can't remove currently playing song, use command skip**"
                    )
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (queue.queue.length == 1)
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(
                        "**Can't remove when only one song is playing, Use command stop**"
                    )
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (args[0] > queue.queue.length)
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("**The queue doesn't have that much songs**")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (!queue)
            return message.channel.send(
                new MessageEmbed()
                    .setDescription(":x: **There are no songs playing in this server**")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        var name = queue.queue[args[0] - 1].name;
        queue.queue.splice(args[0] - 1);
        return message.channel.send(
            new MessageEmbed()
                .setDescription(
                    "**Removed" + " " + name + " " + "from queue :white_check_mark: **"
                )
                .setTimestamp()
                .setColor("BLUE")
                .setFooter(client.user.username, client.user.displayAvatarURL())
        );
    }
}