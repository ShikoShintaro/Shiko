const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
    name: 'skipto',
    aliases: ['st'],
    description: 'Skips the time current music',
    usage: "s!st",

    run: async (client, message, args) => {
        const channel = message.member.voice.channel;
        if (!channel)
            return message.channel.send(new MessageEmbed()
            .setTitle('Oi')
            .setDescription("You must Join a voice channel before using this command!")
            .setColor(config.colors.no)
            .setFooter(client.user.username, client.user.displayAvatarURL())
          );
        let queue = message.client.queue.get(message.guild.id);
        if (!queue)
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("There are no songs playing in this server")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (!args[0])
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("**You must specify the number to skip**")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        if (isNaN(args[0]))
            return message.channel.send(
                new MessageEmbed()
                    .setDescription("**Value must be a number**")
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        queue.playing = !false;

        if (queue.loop) {
            for (let i = 0; i < parseInt(args[0]) - (1 + 1); i++) {
                var delta = queue.queue.shift();
                queue.queue.push(delta);
            }
        } else {
            queue.queue = queue.queue.slice(parseInt(args[0]) - (1 + 1));
        }

        try {
            queue.connection.dispatcher.end();
        } catch (e) {
            console.log(e);
            message.client.queue.delete(message.guild.id);
            queue.vc.leave();
        }

        return message.channel.send(
            new MessageEmbed()
                .setDescription(
                    "**Skipped the music to" +
                    " `" +
                    args[0] +
                    "` " +
                    ":white_check_mark:**"
                )
                .setColor("BLUE")
                .setFooter(client.user.username, client.user.displayAvatarURL())
        );
    }
}