const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Checks the queue',
    usage: "s!q",

    run: async (client, message, args) => {
        const channel = message.member.voice.channel;
        if (!channel)
            return message.channel.send(new MessageEmbed()
            .setTitle('Oi')
            .setDescription("You must Join a voice channel before using this command!")
            .setColor(config.colors.no)
            .setFooter(client.user.username, client.user.displayAvatarURL())
          );
        const queue = message.client.queue.get(message.guild.id);
        var status;
        var np;
        var count = 0;
        if (!queue) status = "There is nothing in queue!";
        else
            status = queue.queue
                .map((x) => {
                    count += 1;
                    return (
                        "• " +
                        "`" +
                        count +
                        "." +
                        "`" +
                        x.name +
                        " -Requested by " +
                        `<@${x.requested.id}>`
                    );
                })
                .join("\n");
        if (!queue) np = status;
        else np = queue.queue[0].name;
        if (queue) thumbnail = queue.queue[0].thumbnail;
        else thumbnail = message.guild.iconURL();
        message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    "Music Queue"
                    
                )
                .setThumbnail(thumbnail)
                .setColor(config.colors.yes)
                .addField("Now Playing", np, true)
                .setDescription(status)
                .setFooter(client.user.username, client.user.displayAvatarURL())
        );
    }
}